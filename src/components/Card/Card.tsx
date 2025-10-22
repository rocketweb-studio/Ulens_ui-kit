import { HTMLAttributes } from 'react'
import s from './Card.module.scss'

type Props = {
  contentClass?: string
} & HTMLAttributes<HTMLDivElement>

export const Card = ({ children, contentClass }: Props) => {
  return (
    <div className={s.card}>
      <div className={contentClass}>{children}</div>
    </div>
  )
}