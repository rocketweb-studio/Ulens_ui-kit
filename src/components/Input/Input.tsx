'use client'

import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Input.module.scss'
import {IconEye, IconEyeOff} from "../../assets/icons/components";

type Props<T extends FieldValues> = {
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
  errorLink?: ReactNode;
}

export const Input = <T extends FieldValues>({
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
    readOnly=false,
  showPasswordToggle = false,
}: Props<T>) => {
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
      <div className={`${styles.inputContainer} ${className}`}>
        <label className={styles.checkboxContainer} htmlFor={id}>
          <input
            type='checkbox'
            disabled={disabled}
            className={styles.checkboxInput}
            id={id}
            {...(register && name ? register(name, { onChange }) : { name, onChange, checked })}
          />
          <span className={styles.checkboxCustom} />
          {label && <span className={styles.checkboxLabel}>{label}</span>}
        </label>
        {error && (
          <div ref={errorRef} className={styles.errorText}>
            {error}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label htmlFor={id} className={`${styles.label} ${required ? styles.required : ''}`}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          readOnly={readOnly}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.errorInput : ''} ${showPasswordToggle && type === 'password' ? styles.passwordInput : ''}`}
          id={id}
          {...(register && name ? register(name, { onChange }) : { name, onChange })}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <IconEyeOff width={24} height={24}/> : <IconEye width={24} height={24}/>}
          </button>
        )}
      </div>
      {error && (
        <div ref={errorRef} className={styles.errorText}>
          <span ref={errorTextRef} className={`${styles.errorTextContent} ${isOverflowing ? styles.animated : ''}`}>
            {error} <span className={styles.errorLink}>{errorLink}</span>
          </span>
        </div>
      )}
    </div>
  )
}
