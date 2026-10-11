/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Café Companion — Centralized Firebase Access Layer
 * Organizes Cloud Firestore and Firebase Authentication.
 * Reusable across all screens without duplication.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

let app: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let isConfigured = false;

// Attempt to load Firebase configuration dynamically from environment or fallback
const existingApps = getApps();
if (existingApps.length > 0) {
  app = existingApps[0];
  try {
    dbInstance = getFirestore(app);
    authInstance = getAuth(app);
    isConfigured = true;
  } catch (err) {
    console.warn('Firebase app detected but Firestore init deferred:', err);
  }
} else {
  // Check for environment variables
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)',
  };

  if (envConfig.projectId && envConfig.apiKey) {
    try {
      app = initializeApp(envConfig);
      dbInstance = getFirestore(app, envConfig.firestoreDatabaseId);
      authInstance = getAuth(app);
      isConfigured = true;
    } catch (err) {
      console.warn('Firebase init with env vars encountered issue:', err);
    }
  } else {
    // Soft fallback for development preview until real credentials are piped
    console.info('Café Companion: Firebase access layer initialized in foundation mode. Ready for Milestone 2 live persistence.');
  }
}

export const db = dbInstance;
export const auth = authInstance;
export const isFirebaseConfigured = isConfigured;

/**
 * Standardized error handler conforming to security guidelines.
 */
export function handleFirestoreError(
  error: unknown, 
  operationType: OperationType, 
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: authInstance?.currentUser?.uid,
      email: authInstance?.currentUser?.email,
      emailVerified: authInstance?.currentUser?.emailVerified,
      isAnonymous: authInstance?.currentUser?.isAnonymous,
      tenantId: authInstance?.currentUser?.tenantId,
      providerInfo: authInstance?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validates connection to Firestore when enabled.
 */
export async function testFirestoreConnection(): Promise<{ connected: boolean; message: string }> {
  if (!dbInstance) {
    return {
      connected: false,
      message: 'Firestore client initialized in foundation/preview mode. Awaiting live project binding in Milestone 2.',
    };
  }

  try {
    await getDocFromServer(doc(dbInstance, 'test', 'connection'));
    return { connected: true, message: 'Connected to Cloud Firestore successfully.' };
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
      return { connected: false, message: 'Firebase client is offline. Check configuration.' };
    }
    // Permissions or non-existent doc is fine as long as reached server
    return { connected: true, message: 'Server reached.' };
  }
}
