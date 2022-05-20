import { FC } from 'react';
import './button.scss';

export type buttonProps = {
  onClick: any;
  children: any;
};

const Button: FC<buttonProps> = (onCLick, children) => {
  return <span>{children}</span>;
};

export default Button;
