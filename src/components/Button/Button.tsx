import s from './Button.module.scss';
import type {ComponentPropsWithoutRef} from "react";


type Props = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';

} & ComponentPropsWithoutRef<'button'>;

export const Button = ({variant = 'primary', className, ...rest}: Props) => {

  return (
    <button {...rest} className={`${s[variant]} ${className? className : ''}`}>Button    </button>
  );
};