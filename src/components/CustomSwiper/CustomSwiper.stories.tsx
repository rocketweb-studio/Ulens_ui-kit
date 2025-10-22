import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomSwiper } from './CustomSwiper';
import { TSlide } from './types';
import type { Swiper as SwiperType } from 'swiper';
import './CustomSwiper.module.scss';

const meta: Meta<typeof CustomSwiper> = {
    title: 'Components/CustomSwiper',
    component: CustomSwiper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        slides: {
            control: false,
        },
        onSlideChange: {
            action: 'slide changed',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CustomSwiper>;

// Демо-контент для слайдов
const SlideContent: React.FC<{ number: number; color: string; text: string }> = ({ number, color, text }) => (
    <div
        style={{
            height: '300px',
            backgroundColor: color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            borderRadius: '8px',
        }}
    >
        <div>Слайд {number}</div>
        <div style={{ fontSize: '16px', marginTop: '10px', fontWeight: 'normal' }}>{text}</div>
    </div>
);

// Базовые слайды для демонстрации
const baseSlides: TSlide[] = [
    {
        id: '1',
        content: <SlideContent number={1} color="#007bff" text="Первый слайд" />,
    },
    {
        id: '2',
        content: <SlideContent number={2} color="#28a745" text="Второй слайд" />,
    },
    {
        id: '3',
        content: <SlideContent number={3} color="#dc3545" text="Третий слайд" />,
    },
    {
        id: '4',
        content: <SlideContent number={4} color="#ffc107" text="Четвертый слайд" />,
    },
];

const imageSlides: TSlide[] = [
    {
        id: 'img1',
        content: (
            <div
                style={{
                    height: '400px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '24px',
                }}
            >
                Градиентный слайд 1
            </div>
        ),
    },
    {
        id: 'img2',
        content: (
            <div
                style={{
                    height: '400px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '24px',
                }}
            >
                Градиентный слайд 2
            </div>
        ),
    },
    {
        id: 'img3',
        content: (
            <div
                style={{
                    height: '400px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '24px',
                }}
            >
                Градиентный слайд 3
            </div>
        ),
    },
];

export const Default: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        allowTouchMove: false,
    },
};

export const WithoutNavigation: Story = {
    args: {
        slides: baseSlides,
        navigation: false,
        pagination: true,
        allowTouchMove: true,
    },
};

export const WithoutPagination: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: false,
        allowTouchMove: true,
    },
};

export const TouchMoveEnabled: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        allowTouchMove: true,
    },
};

export const WithAutoplay: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        autoplay: true,
        allowTouchMove: false,
    },
};

export const CustomAutoplayDelay: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        autoplay: { delay: 5000 },
        allowTouchMove: false,
    },
};

export const SingleSlide: Story = {
    args: {
        slides: [baseSlides[0]],
        navigation: false,
        pagination: false,
        allowTouchMove: false,
    },
};

export const ManySlides: Story = {
    args: {
        slides: [
            ...baseSlides,
            {
                id: '5',
                content: <SlideContent number={5} color="#6f42c1" text="Пятый слайд" />,
            },
            {
                id: '6',
                content: <SlideContent number={6} color="#e83e8c" text="Шестой слайд" />,
            },
            {
                id: '7',
                content: <SlideContent number={7} color="#fd7e14" text="Седьмой слайд" />,
            },
        ],
        navigation: true,
        pagination: true,
        allowTouchMove: true,
    },
};

export const WithCustomBreakpoints: Story = {
    args: {
        slides: imageSlides,
        navigation: true,
        pagination: true,
        allowTouchMove: true,
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    },
};

export const ComplexContent: Story = {
    args: {
        slides: [
            {
                id: 'complex1',
                content: (
                    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <h3>Карточка продукта</h3>
                        <p>Описание продукта с подробной информацией и характеристиками.</p>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}>
                            Купить
                        </button>
                    </div>
                ),
            },
            {
                id: 'complex2',
                content: (
                    <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                        <h3>Статистика</h3>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <div style={{ flex: 1, padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>95%</div>
                                <div>Эффективность</div>
                            </div>
                            <div style={{ flex: 1, padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>1.2k</div>
                                <div>Пользователей</div>
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                id: 'complex3',
                content: (
                    <div style={{ padding: '20px', backgroundColor: '#dee2e6', borderRadius: '8px' }}>
                        <h3>Отзывы</h3>
                        <div style={{ fontStyle: 'italic', marginTop: '10px' }}>
                            "Отличный продукт! Очень помог в работе и значительно ускорил процессы."
                        </div>
                        <div style={{ marginTop: '10px', fontWeight: 'bold' }}> — Иван Петров</div>
                    </div>
                ),
            },
        ],
        navigation: true,
        pagination: true,
        allowTouchMove: true,
    },
};

// Playground story
export const Playground: Story = {
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        autoplay: false,
        allowTouchMove: false,
        className: '',
    },
};

// Демонстрация всех состояний
export const AllStates: Story = {
    render: () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div>
                    <h3 style={{ marginBottom: '16px' }}>Базовый слайдер</h3>
                    <CustomSwiper
                        slides={baseSlides}
                        navigation={true}
                        pagination={true}
                        allowTouchMove={false}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>С автопрокруткой</h3>
                    <CustomSwiper
                        slides={imageSlides}
                        navigation={true}
                        pagination={true}
                        autoplay={true}
                        allowTouchMove={false}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Без навигации</h3>
                    <CustomSwiper
                        slides={baseSlides}
                        navigation={false}
                        pagination={true}
                        allowTouchMove={true}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Без пагинации</h3>
                    <CustomSwiper
                        slides={baseSlides}
                        navigation={true}
                        pagination={false}
                        allowTouchMove={true}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Один слайд</h3>
                    <CustomSwiper
                        slides={[baseSlides[0]]}
                        navigation={false}
                        pagination={false}
                        allowTouchMove={false}
                    />
                </div>
            </div>
        );
    },
};

// Story с обработчиком изменения слайда
export const WithSlideChangeHandler: Story = {
    render: (args) => {
        const handleSlideChange = (swiper: SwiperType) => {
            console.log('Active slide changed to:', swiper.activeIndex);
        };

        return (
            <CustomSwiper
                {...args}
                onSlideChange={handleSlideChange}
            />
        );
    },
    args: {
        slides: baseSlides,
        navigation: true,
        pagination: true,
        allowTouchMove: false,
    },
};