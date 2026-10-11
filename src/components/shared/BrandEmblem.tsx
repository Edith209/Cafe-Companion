/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface BrandEmblemProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  useImage?: boolean;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  size = 'md',
  className = '',
  useImage = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const emblemImageUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1V-HMBVSxP_BfdwW43EobcAuDVpuv5OpFWsbk5DYL92Z3lF3Gi1UPeIt5PM5BViEcUGb9DAX_LT2c3uHzai5PJhrWGS4YFMqyEN_QHiKQyghCQ_mBrtDRrRrP1Od6bfx6OXl6R_tsk8fTXQNYBHy8m648FFRZx43bDV8QL4o6TeoGkKssqgCbHL1btN7o-gailhKYWva_SIvISqtE0Z93w0CFK9ziBsPqwBkFNlyCi4IeM7Wk9E9Nj9bbY';

  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  if (useImage && !imageError) {
    return (
      <img
        alt="Café Companion Emblem"
        src={emblemImageUrl}
        onError={() => setImageError(true)}
        className={`h-8 w-auto object-contain shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-xl bg-[#874D27] text-white flex items-center justify-center shadow-xs shrink-0 ${sizeMap[size]} ${className}`}
    >
      <span className="material-symbols-outlined text-[20px]">coffee</span>
    </div>
  );
};
