'use client';

import React from 'react';
import BottomSheetHeader from '@/shared/ui/bottomSheet/bottomSheetHeader';
import { motion } from 'framer-motion';

const BottomSheet = () => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-[100px] bg-white rounded-t-lg shadow-lg"
      style={{ transform: 'translateY(10px)' }}
    >
      <BottomSheetHeader />
      BottomSheet
    </motion.div>
  );
};

export default BottomSheet;
