'use client';

import React from 'react';
import BottomSheetHeader from '@/shared/ui/bottomSheet/bottomSheetHeader';
import { useBottomSheet } from '@/shared/ui/bottomSheet/hooks/useBottomSheet';

const BottomSheet = () => {
  const { sheetPosition, handleMouseDown, handleTouchStart, isDragging } =
    useBottomSheet();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg"
      style={{
        height: `${sheetPosition}vh`,
        transition: isDragging ? 'none' : 'height 0.3s ease',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div>
        <BottomSheetHeader />
      </div>
      <div className="p-4">BottomSheet Content</div>
    </div>
  );
};

export default BottomSheet;
