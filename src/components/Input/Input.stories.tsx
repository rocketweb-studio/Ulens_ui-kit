import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from './Input.tsx';

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['text', 'password', 'email', 'checkbox'],
            description: 'Тип поля ввода',
        },
        disabled: {
            control: 'boolean',
            description: 'Отключенное состояние',
        },
        required: {
            control: 'boolean',
            description: 'Обязательное поле',
        },
        readOnly: {
            control: 'boolean',
            description: 'Только для чтения',
        },
        showPasswordToggle: {
            control: 'boolean',
            description: 'Показать переключатель пароля',
        },
        error: {
            control: 'text',
            description: 'Текст ошибки',
        },
        placeholder: {
            control: 'text',
            description: 'Плейсхолдер',
        },
        label: {
            control: 'text',
            description: 'Лейбл поля',
        },
    },
    args: {
        onChange: fn(),
        placeholder: 'Введите текст...',
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые сторисы
export const Text: Story = {
    args: {
        type: 'text',
        label: 'Текстовое поле',
        placeholder: 'Введите имя...',
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль...',
    },
};

export const PasswordWithToggle: Story = {
    args: {
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль...',
        showPasswordToggle: true,
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        label: 'Email',
        placeholder: 'example@mail.com',
    },
};

export const Checkbox: Story = {
    args: {
        type: 'checkbox',
        label: 'Согласен с условиями',
    },
};

// Сторисы по состояниям
export const WithError: Story = {
    args: {
        type: 'text',
        label: 'Email',
        error: 'Некорректный формат email',
        placeholder: 'example@mail.com',
    },
};

export const WithLongError: Story = {
    args: {
        type: 'text',
        label: 'Телефон',
        error: 'Очень длинное сообщение об ошибке которое не помещается в одну строку и должно прокручиваться',
        placeholder: '+7 (XXX) XXX-XX-XX',
    },
};

export const Disabled: Story = {
    args: {
        type: 'text',
        label: 'Отключенное поле',
        placeholder: 'Нельзя изменить',
        disabled: true,
    },
};

export const ReadOnly: Story = {
    args: {
        type: 'text',
        label: 'Только чтение',
        value: 'Это значение нельзя изменить',
        readOnly: true,
    },
};

export const Required: Story = {
    args: {
        type: 'text',
        label: 'Обязательное поле',
        placeholder: 'Это поле обязательно для заполнения',
        required: true,
    },
};

// Комбинации
export const PasswordWithError: Story = {
    args: {
        type: 'password',
        label: 'Пароль',
        error: 'Пароль должен содержать не менее 8 символов',
        showPasswordToggle: true,
        placeholder: 'Введите пароль...',
    },
};

// Групповые сторисы
export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
            <Input
                type="text"
                label="Нормальное состояние"
                placeholder="Введите текст..."
            />
            <Input
                type="text"
                label="С ошибкой"
                error="Поле заполнено некорректно"
                placeholder="Введите текст..."
            />
            <Input
                type="text"
                label="Отключенное"
                placeholder="Неактивное поле"
                disabled
            />
            <Input
                type="text"
                label="Только чтение"
                value="Неизменяемое значение"
                readOnly
            />
        </div>
    ),
};

export const InputTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
            <Input
                type="text"
                label="Текстовое поле"
                placeholder="Введите текст..."
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="Введите пароль..."
                showPasswordToggle
            />
            <Input
                type="email"
                label="Email"
                placeholder="example@mail.com"
            />
            <Input
                type="checkbox"
                label="Согласие на обработку данных"
            />
        </div>
    ),
};