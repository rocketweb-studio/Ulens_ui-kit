import { ReactNode } from 'react'
import {SwiperProps, SwiperSlideProps} from "swiper/react";
import { Swiper as SwiperType } from 'swiper';

export type TSlide = {
  id: string | number
  content: ReactNode
  slideProps?: SwiperSlideProps
}

export type TCustomSwiperProps = {
  slides: TSlide[]
  swiperProps?: SwiperProps
  navigation?: boolean
  pagination?: boolean
  autoplay?: boolean | { delay: number }
  className?: string
  breakpoints?:{ [key: number]: SwiperProps }
  allowTouchMove?: boolean
  onSlideChange?: (swiper: SwiperType) => void;
}

export type TNavigationButtonsProps = {
  onPrev: () => void
  onNext: () => void
  isBeginning: boolean
  isEnd: boolean
  className?: string
}
