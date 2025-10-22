import React, { useRef, useState, useCallback } from 'react'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { TCustomSwiperProps, TSlide } from './types'
import { CustomNavigation } from './CustomNavigation'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from './CustomSwiper.module.scss'

export const CustomSwiper: React.FC<TCustomSwiperProps> = ({
                                                             slides,
                                                             swiperProps = {},
                                                             navigation = true,
                                                             pagination = true,
                                                             autoplay = false,
                                                             className = '',
                                                             breakpoints,
                                                             allowTouchMove = false,
                                                             onSlideChange,
                                                           }: TCustomSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [])

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    setActiveIndex(swiper.activeIndex)

    if (onSlideChange) {
      onSlideChange(swiper)
    }
  }, [onSlideChange])

  const handleInit = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }, [])

  const defaultSwiperProps = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 0,
    slidesPerView: 1,
    initialSlide: 0,
    noSwiping: true,
    preventInteractionOnTransition: true,
    noSwipingClass: 'swiper-slide',
    allowTouchMove: allowTouchMove,
    onSlideChange: handleSlideChange,
    onInit: handleInit,
    ...swiperProps,
    ...(breakpoints && { breakpoints }),
  }

  const autoplayConfig = autoplay
      ? typeof autoplay === 'boolean'
          ? { delay: 3000 }
          : autoplay
      : false

  return (
      <div className={`${styles.swiperContainer} ${className}`}>
        {autoplay && (
            <div
                className={styles.progressBar}
                style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
        )}

        <Swiper
            ref={swiperRef}
            {...defaultSwiperProps}
            autoplay={autoplayConfig}
            className={styles.swiperWrapper}
        >
          {slides.map((slide: TSlide) => {
            return (
                <SwiperSlide
                    key={slide.id}
                    {...slide.slideProps}
                    className={styles.slide}
                >
                  {slide.content}
                </SwiperSlide>
            )
          })}
        </Swiper>

        {navigation && slides.length > 1 && (
            <CustomNavigation
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
            />
        )}

        {pagination && slides.length > 1 && (
            <div className={styles.pagination}>
              {slides.map((_, index) => (
                  <button
                      key={index}
                      className={`${styles.paginationBullet} ${index === activeIndex ? styles.active : ''}`}
                      onClick={() => swiperRef.current?.swiper.slideTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                  />
              ))}
            </div>
        )}
      </div>
  )
}