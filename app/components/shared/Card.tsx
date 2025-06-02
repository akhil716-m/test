import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: FC<CardProps> = ({
  children,
  className,
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={clsx(
        'rounded-card bg-white p-4 shadow-sm',
        {
          'cursor-pointer transition-shadow hover:shadow-md': hoverable || onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 