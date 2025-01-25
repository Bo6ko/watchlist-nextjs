import css from './Button.module.css';
import cn from 'classnames';

export type ButtonProps = {
  fullWidth?: boolean,
  btnType?: 'primary' | 'secondary',
  size?: 'regular' | 'small',
  customClass?: string,
  disabled?: boolean,
  children: React.ReactNode,
  onClick?: () => void;
};

export const Button = ({
  btnType,
  size,
  fullWidth,
  disabled,
  customClass,
  children,
  ...rest
}: ButtonProps) => {

  return (
    <button
      className={cn(css.root, 
        { [css.fullWidth]: !!fullWidth}, 
        css[btnType || 'primary'], 
        css[size || 'regular'], 
        customClass
      )} 
      disabled={!!disabled} 
      {...rest}
    >
      {children}
    </button>
  )
}
