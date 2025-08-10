import { ButtonHTMLAttributes } from 'react';
import clsx from 'classnames';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) {
  const { className, variant = 'primary', ...rest } = props;
  const base = variant === 'primary' ? 'btn btn-primary' : 'btn btn-outline';
  return <button className={clsx(base, className)} {...rest} />;
} 