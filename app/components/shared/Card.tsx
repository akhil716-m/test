'use client';

import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white p-4 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card; 