import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import s from './Input.module.scss'
import {IconEye, IconEyeOff} from "../../assets/icons/components";

type InputProps<T extends FieldValues = FieldValues> = {
    type?: string
    name?: Path<T>
    id?: string
    value?: string
    checked?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string | ReactNode
    error?: string
    disabled?: boolean
    className?: string
    register?: UseFormRegister<T>
    showPasswordToggle?: boolean
    required?: boolean
    readOnly?: boolean
    errorLink?: ReactNode
}

export const Input = <T extends FieldValues = FieldValues>({
                                                               type = 'text',
                                                               name,
                                                               value,
                                                               checked,
                                                               onChange,
                                                               placeholder = '',
                                                               label,
                                                               error,
                                                               id,
                                                               disabled = false,
                                                               className = '',
                                                               register,
                                                               required,
                                                               errorLink,
                                                               readOnly = false,
                                                               showPasswordToggle = false,
                                                           }: InputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false)
    const errorRef = useRef<HTMLDivElement>(null)
    const errorTextRef = useRef<HTMLSpanElement>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const inputType = showPasswordToggle && type === 'password' && showPassword ? 'text' : type

    useEffect(() => {
        if (!errorRef.current || !errorTextRef.current || !error) return

        const checkOverflow = () => {
            const containerWidth = errorRef.current?.clientWidth || 0
            const textWidth = errorTextRef.current?.scrollWidth || 0

            const overflowing = textWidth > containerWidth
            setIsOverflowing(overflowing)

            if (overflowing && errorTextRef.current) {
                const scrollAmount = textWidth - containerWidth
                errorTextRef.current.style.setProperty('--scroll-amount', `-${scrollAmount}px`)

                const duration = scrollAmount / 100 + 4
                errorTextRef.current.style.setProperty('--animation-duration', `${duration}s`)
            }
        }

        checkOverflow()

        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [error])

    if (type === 'checkbox') {
        return (
            <div className={`${s.inputContainer} ${className}`}>
                <label className={s.checkboxContainer} htmlFor={id}>
                    <input
                        type='checkbox'
                        disabled={disabled}
                        className={s.checkboxInput}
                        id={id}
                        {...(register && name ? register(name, { onChange }) : { name, onChange, checked })}
                    />
                    <span className={s.checkboxCustom} />
                    {label && <span className={s.checkboxLabel}>{label}</span>}
                </label>
                {error && (
                    <div ref={errorRef} className={s.errorText}>
                        {error}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={`${s.inputContainer} ${className}`}>
            {label && (
                <label htmlFor={id} className={`${s.label} ${required ? s.required : ''}`}>
                    {label}
                </label>
            )}
            <div className={s.inputWrapper}>
                <input
                    readOnly={readOnly}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${s.input} ${error ? s.errorInput : ''} ${showPasswordToggle && type === 'password' ? s.passwordInput : ''}`}
                    id={id}
                    {...(register && name ? register(name, { onChange }) : { name, onChange })}
                />
                {showPasswordToggle && type === 'password' && (
                    <button
                        type='button'
                        className={s.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                    >
                        {showPassword ? <IconEye/> : <IconEyeOff/>}
                    </button>
                )}
            </div>
            {error && (
                <div ref={errorRef} className={s.errorText}>
          <span ref={errorTextRef} className={`${s.errorTextContent} ${isOverflowing ? s.animated : ''}`}>
            {error} <span className={s.errorLink}>{errorLink}</span>
          </span>
                </div>
            )}
        </div>
    )
}

