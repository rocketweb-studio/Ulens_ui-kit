import s from './Button.module.scss';
import {ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode} from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'text-white' | 'in-text' | 'darken'
export type ButtonSize = 'small' | 'medium' | 'large' | 'inherit'

export interface BaseButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    isLoading?: boolean
    disabled?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    centredIcon?: ReactNode
    underlineText?: boolean
    withoutPadding?: boolean
    className?: string
    children?: ReactNode
}

interface LinkSpecificProps {
    href?: string
    path?: string
}

export interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    tagType?: 'button'
}

export interface LinkButtonProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>, LinkSpecificProps {
    tagType: 'link'
}

export type UniversalButtonProps = ButtonProps | LinkButtonProps

export const Button = (props: UniversalButtonProps) => {
    const {
        children,
        tagType = 'button',
        variant = 'primary',
        size = 'medium',
        fullWidth = false,
        isLoading = false,
        disabled = false,
        leftIcon,
        rightIcon,
        centredIcon,
        underlineText = false,
        className = '',
        withoutPadding = false,
        ...restProps
    } = props

    const buttonClasses = [
        s.button,
        s[`variant-${variant}`],
        s[`size-${size}`],
        fullWidth && s.fullWidth,
        isLoading && s.loading,
        underlineText && s.underline,
        withoutPadding && s.withoutPadding,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    const content = (
        <>
            {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
            {centredIcon && <span className={s.centredIcon}>{centredIcon}</span>}
            {children}
            {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
            {isLoading && <span className={s.loader}>Loading...</span>}
        </>
    )

    if (tagType === 'link') {
        const linkProps = restProps as Omit<LinkButtonProps, keyof BaseButtonProps>
        const href = linkProps.href || linkProps.path || '/'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { path: _unusedPath, ...linkRestProps } = linkProps

        return (
            <a
                href={href}
                className={buttonClasses}
                aria-disabled={disabled || isLoading}
                {...linkRestProps}
            >
                {content}
            </a>
        )
    }

    const buttonProps = restProps as Omit<ButtonProps, keyof BaseButtonProps>

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...buttonProps}
        >
            {content}
        </button>
    )
}
