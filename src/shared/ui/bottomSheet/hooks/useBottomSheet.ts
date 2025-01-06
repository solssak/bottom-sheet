import { useState, useEffect, useRef } from 'react';

export const useBottomSheet = (initialPosition = 10) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [sheetPosition, setSheetPosition] = useState(initialPosition);
  const sheetPositionRef = useRef(initialPosition);

  const startDrag = (y: number) => {
    setStartY(y);
    setIsDragging(true);
  };

  const updatePosition = (y: number, eventType: 'mouse' | 'touch') => {
    // 이벤트 유형에 따라 감도 조정
    console.log(eventType);
    const SCALE_FACTOR = eventType === 'mouse' ? 30 : 7;
    const delta = startY - y;
    const newPosition = Math.min(
      Math.max(
        sheetPositionRef.current + (delta / window.innerHeight) * SCALE_FACTOR,
        10,
      ),
      80,
    );
    setSheetPosition(newPosition);
    sheetPositionRef.current = newPosition;
  };

  const endDrag = () => {
    setIsDragging(false);

    const currentPosition = sheetPositionRef.current;

    let finalPosition;
    if (currentPosition > 40) {
      finalPosition = 70;
    } else {
      finalPosition = 10;
    }

    setSheetPosition(finalPosition);
    sheetPositionRef.current = finalPosition;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    startDrag(event.clientY);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    startDrag(event.touches[0].clientY);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) updatePosition(event.clientY, 'mouse');
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging) updatePosition(event.touches[0].clientY, 'touch');
    };

    const handleMouseUp = () => {
      if (isDragging) endDrag();
    };

    const handleTouchEnd = () => {
      if (isDragging) endDrag();
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return { sheetPosition, handleMouseDown, handleTouchStart, isDragging };
};
