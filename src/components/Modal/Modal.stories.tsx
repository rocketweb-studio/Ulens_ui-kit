import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button';
import './Modal.module.scss';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
        },
        onClose: {
            action: 'closed',
        },
        onOverlayClick: {
            action: 'overlay clicked',
        },
        entity: {
            control: { type: 'select' },
            options: ['postModal', 'default'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Базовый компонент для демонстрации модалки
const ModalDemo: React.FC<React.ComponentProps<typeof Modal>> = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>
                Открыть модалку
            </Button>
            <Modal
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Заголовок модалки',
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Это содержимое модального окна.</p>
                <p>Здесь может быть любой React компонент.</p>
            </div>
        ),
    },
};

export const WithoutTitle: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: '',
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Модалка без заголовка</p>
            </div>
        ),
    },
};

export const WithoutPadding: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Без внутренних отступов',
        withoutPadding: true,
        children: (
            <div>
                <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
                    Контент с собственными отступами
                </div>
                <div style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
                    Еще один блок
                </div>
            </div>
        ),
    },
};

export const WithoutCloseButton: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Без кнопки закрытия',
        hideCloseButton: true,
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Закрыть можно только через кнопку OK или клик по оверлею</p>
            </div>
        ),
    },
};

export const WithoutDefaultButton: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Без кнопки OK',
        hideDefaultButton: true,
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Закрыть можно через крестик или клик по оверлею</p>
            </div>
        ),
    },
};

export const WithCustomButtonsInHeader: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Кастомные кнопки в заголовке',
        buttonLeftInModalHeader: (
            <Button variant="outline" size="small">
                Назад
            </Button>
        ),
        buttonRightInModalHeader: (
            <Button variant="outline" size="small">
                Сохранить
            </Button>
        ),
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Модалка с дополнительными кнопками в заголовке</p>
            </div>
        ),
    },
};

export const ComplexContent: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Сложный контент',
        children: (
            <div style={{ padding: '20px 0' }}>
                <h4>Форма в модалке</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    <input
                        type="text"
                        placeholder="Имя"
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <textarea
                        placeholder="Сообщение"
                        rows={4}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
            </div>
        ),
    },
};

export const WithoutAnimation: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Без анимации',
        animationMode: false,
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Эта модалка открывается без анимации</p>
            </div>
        ),
    },
};

export const PostModalEntity: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Post Modal',
        entity: 'postModal',
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Модалка с особым поведением для entity="postModal"</p>
            </div>
        ),
    },
};

// Тип для демонстрационных модалок
type DemoModalConfig = {
    key: string;
    title: string;
    withoutPadding?: boolean;
    hideCloseButton?: boolean;
    hideDefaultButton?: boolean;
}

export const StatesDemo: Story = {
    render: () => {
        const [activeModal, setActiveModal] = useState<string | null>(null);

        const modals: DemoModalConfig[] = [
            { key: 'default', title: 'Обычная модалка' },
            { key: 'noTitle', title: '' },
            { key: 'noPadding', title: 'Без отступов', withoutPadding: true },
            { key: 'noClose', title: 'Без крестика', hideCloseButton: true },
            { key: 'noButton', title: 'Без кнопки OK', hideDefaultButton: true },
        ];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {modals.map((modal) => (
                    <Button key={modal.key} onClick={() => setActiveModal(modal.key)}>
                        Открыть: {modal.title || 'Без заголовка'}
                    </Button>
                ))}

                {modals.map((modal) => (
                    <Modal
                        key={modal.key}
                        isOpen={activeModal === modal.key}
                        onClose={() => setActiveModal(null)}
                        modalTitle={modal.title}
                        withoutPadding={modal.withoutPadding}
                        hideCloseButton={modal.hideCloseButton}
                        hideDefaultButton={modal.hideDefaultButton}
                    >
                        <div style={{ padding: '20px 0' }}>
                            <p>Содержимое для {modal.title || 'модалки без заголовка'}</p>
                        </div>
                    </Modal>
                ))}
            </div>
        );
    },
};

// Контролируемая модалка для playground
export const Playground: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setIsOpen(true)}>
                    Открыть модалку
                </Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        );
    },
    args: {
        modalTitle: 'Playground модалка',
        closeOnEsc: true,
        withoutPadding: false,
        hideDefaultButton: false,
        hideCloseButton: false,
        animationMode: true,
        children: (
            <div style={{ padding: '20px 0' }}>
                <p>Используйте Controls для настройки параметров</p>
                <p>Это демонстрационный контент модального окна</p>
            </div>
        ),
    },
};

// Дополнительные примеры с разным контентом
export const WithListContent: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Список элементов',
        children: (
            <div style={{ padding: '20px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'].map((item, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '12px',
                                backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                                marginBottom: '4px',
                                borderRadius: '4px',
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
};

export const WithTableContent: Story = {
    render: (args) => <ModalDemo {...args} />,
    args: {
        modalTitle: 'Таблица данных',
        children: (
            <div style={{ padding: '20px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Имя</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Возраст</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Город</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Иван</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>25</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Москва</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Мария</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>30</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Санкт-Петербург</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        ),
    },
};