import React, { HTMLAttributes, MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import {IconClose} from "../../assets/icons/components";
import {Button} from "../Button";

export type Props = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    closeOnOverlayClick?: boolean
    closeOnEsc?: boolean
    onOverlayClick?: (e: MouseEvent<HTMLDivElement>) => void
    modalTitle: string
    className?: string
    withoutPadding?: boolean
    hideDefaultButton?: boolean
    hideCloseButton?: boolean
    buttonRightInModalHeader?: React.ReactNode
    buttonLeftInModalHeader?: React.ReactNode
    animationMode?: boolean
    entity?: 'postModal' | string
} & HTMLAttributes<HTMLDivElement>

export const Modal = ({
                          isOpen,
                          onClose,
                          onOverlayClick,
                          children,
                          modalTitle,
                          className = '',
                          closeOnEsc = true,
                          withoutPadding = false,
                          hideDefaultButton = false,
                          hideCloseButton = false,
                          buttonRightInModalHeader,
                          buttonLeftInModalHeader,
                          animationMode = true,
                          entity,
                      }: Props) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isOpen || !closeOnEsc || !isMounted) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose, closeOnEsc, isMounted])

    const renderModalContent = (isAnimated: boolean) => {
        const Overlay = isAnimated ? motion.div : 'div'
        const Content = isAnimated ? motion.div : 'div'

        const overlayProps =
            isAnimated && entity !== 'postModal' ?
                {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                }
                : {}

        const contentProps =
            isAnimated ?
                {
                    initial: { transform: 'translateY(-50px)', opacity: 0 },
                    animate: { transform: 'translateY(0)', opacity: 1 },
                    exit: { transform: 'translateY(-50px)', opacity: 0 },
                }
                : {}

        const content = (
            <Overlay {...overlayProps} className={s.overlay} onClick={onOverlayClick}>
                <Content {...contentProps} className={`${s.content} ${className}`}>
                    {modalTitle.length > 0 && (
                        <div className={s.header}>
                            {buttonLeftInModalHeader}
                            <h3 className={s.title}>{modalTitle}</h3>
                            {buttonRightInModalHeader}
                            {!hideCloseButton && (
                                <button className={s.closeButton} onClick={onClose}>
                                    <IconClose/>
                                </button>
                            )}
                        </div>
                    )}
                    <div className={`${s.flexContainer} ${withoutPadding ? s.withoutPadding : ''}`}>
                        {children}
                        {!hideDefaultButton && (
                            <Button className={s.button} onClick={onClose}>
                                ОК
                            </Button>
                        )}
                    </div>
                </Content>
            </Overlay>
        )

        return isAnimated ? <AnimatePresence>{content}</AnimatePresence> : content
    }

    if (!isOpen) return null

    if (!isMounted) {
        return renderModalContent(false)
    }

    return createPortal(renderModalContent(animationMode), document.body)
}
