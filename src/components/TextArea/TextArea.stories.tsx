import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { TextArea } from './TextArea';
import './TextArea.module.scss';

type FormData = {
    description: string;
    comment: string;
    bio: string;
    message: string;
};

const meta: Meta<typeof TextArea> = {
    title: 'Components/TextArea',
    component: TextArea,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        register: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TextArea<FormData>>;

// Контролируемый компонент для демонстрации
const ControlledTextArea: React.FC<React.ComponentProps<typeof TextArea<FormData>>> = (args) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <TextArea<FormData>
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        placeholder: 'Введите текст...',
        label: 'Описание',
        rows: 3,
    },
};

export const WithoutLabel: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        placeholder: 'Введите текст без заголовка...',
        rows: 3,
    },
};

export const WithError: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        label: 'Комментарий',
        placeholder: 'Введите комментарий...',
        error: 'Это поле обязательно для заполнения',
        rows: 3,
    },
};

export const Disabled: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        label: 'Отключенное поле',
        placeholder: 'Это поле отключено',
        disabled: true,
        rows: 3,
    },
};

export const WithMaxLength: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        label: 'Сообщение',
        placeholder: 'Введите сообщение (максимум 100 символов)',
        maxLength: 100,
        rows: 3,
    },
};

export const WithCounter: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        label: 'Биография',
        placeholder: 'Расскажите о себе...',
        maxLength: 200,
        withCounter: true,
        rows: 4,
    },
};

export const DifferentRows: Story = {
    render: () => {
        const [value1, setValue1] = useState('');
        const [value2, setValue2] = useState('');
        const [value3, setValue3] = useState('');

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextArea<FormData>
                    label="Короткое поле (2 строки)"
                    placeholder="Короткий текст..."
                    rows={2}
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                />
                <TextArea<FormData>
                    label="Стандартное поле (4 строки)"
                    placeholder="Стандартный текст..."
                    rows={4}
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                />
                <TextArea<FormData>
                    label="Длинное поле (6 строк)"
                    placeholder="Длинный текст..."
                    rows={6}
                    value={value3}
                    onChange={(e) => setValue3(e.target.value)}
                />
            </div>
        );
    },
};

export const WithReactHookForm: Story = {
    render: () => {
        const { register } = useForm<FormData>();

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextArea<FormData>
                    name="description"
                    label="Описание с react-hook-form"
                    placeholder="Введите описание..."
                    register={register}
                    rows={3}
                />
                <TextArea<FormData>
                    name="comment"
                    label="Комментарий с валидацией"
                    placeholder="Введите комментарий..."
                    register={register}
                    maxLength={150}
                    withCounter={true}
                    rows={4}
                />
            </div>
        );
    },
};

export const LongErrorAnimation: Story = {
    render: (args) => <ControlledTextArea {...args} />,
    args: {
        label: 'Поле с длинной ошибкой',
        placeholder: 'Введите текст...',
        error: 'Это очень длинное сообщение об ошибке, которое должно анимироваться при переполнении контейнера и показывать всю информацию пользователю',
        rows: 3,
    },
};

// Playground story
export const Playground: Story = {
    render: (args) => {
        const [value, setValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
        };

        return (
            <TextArea<FormData>
                {...args}
                value={value}
                onChange={handleChange}
            />
        );
    },
    args: {
        label: 'Playground TextArea',
        placeholder: 'Поэкспериментируйте с настройками...',
        rows: 4,
        maxLength: 200,
        withCounter: false,
        disabled: false,
    },
};

// Демонстрация всех состояний
export const AllStates: Story = {
    render: () => {
        const [value1, setValue1] = useState('');
        const [value2, setValue2] = useState('');
        const [value3, setValue3] = useState('');
        const [value4, setValue4] = useState('Предзаполненный текст');
        const [value5, setValue5] = useState('');

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
                <div>
                    <h3 style={{ marginBottom: '16px' }}>Обычное поле</h3>
                    <TextArea<FormData>
                        label="Описание"
                        placeholder="Введите описание..."
                        rows={3}
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>С ошибкой</h3>
                    <TextArea<FormData>
                        label="Комментарий"
                        placeholder="Введите комментарий..."
                        error="Поле обязательно для заполнения"
                        rows={3}
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>С счетчиком символов</h3>
                    <TextArea<FormData>
                        label="Сообщение"
                        placeholder="Введите сообщение..."
                        maxLength={100}
                        withCounter={true}
                        rows={3}
                        value={value3}
                        onChange={(e) => setValue3(e.target.value)}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Отключенное поле</h3>
                    <TextArea<FormData>
                        label="Отключенное поле"
                        placeholder="Нельзя редактировать"
                        disabled={true}
                        rows={3}
                        value={value4}
                        onChange={(e) => setValue4(e.target.value)}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px' }}>Без заголовка</h3>
                    <TextArea<FormData>
                        placeholder="Просто текстовое поле без заголовка..."
                        rows={3}
                        value={value5}
                        onChange={(e) => setValue5(e.target.value)}
                    />
                </div>
            </div>
        );
    },
};