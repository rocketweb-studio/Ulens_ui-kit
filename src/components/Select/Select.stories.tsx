import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Select } from './Select.tsx';

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: { type: 'object' },
            description: 'Массив опций для выбора',
        },
        title: {
            control: { type: 'text' },
            description: 'Заголовок селекта',
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Текст плейсхолдера',
        },
        disabled: {
            control: 'boolean',
            description: 'Отключенное состояние',
        },
        style: {
            control: { type: 'object' },
            description: 'Дополнительные стили',
        },
        propsValue: {
            control: { type: 'text' },
            description: 'Внешнее значение',
        },
    },
    args: {
        onChange: fn(),
        options: ['Option 1', 'Option 2', 'Option 3', 'Another option', 'Test option'],
        placeholder: 'Выбрать',
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые сторисы
export const Default: Story = {
    args: {
        title: 'Default Select',
    },
};

export const WithTitle: Story = {
    args: {
        title: 'Выберите опцию',
    },
};

export const WithCustomPlaceholder: Story = {
    args: {
        title: 'Select with placeholder',
        placeholder: 'Выберите значение...',
    },
};

export const Disabled: Story = {
    args: {
        title: 'Disabled Select',
        disabled: true,
    },
};

// Сторисы с разными наборами опций
export const ManyOptions: Story = {
    args: {
        title: 'Many Options',
        options: [
            'First option',
            'Second option',
            'Third option',
            'Fourth option',
            'Fifth option',
            'Sixth option',
            'Seventh option',
            'Eighth option',
        ],
    },
};

export const ShortOptions: Story = {
    args: {
        title: 'Short Options',
        options: ['A', 'B', 'C', 'D'],
    },
};

export const LongOptions: Story = {
    args: {
        title: 'Long Options',
        options: [
            'Very long option name that might wrap to multiple lines',
            'Another extremely long option description that should be handled properly',
            'Short',
        ],
    },
};

// Состояния
export const WithPredefinedValue: Story = {
    args: {
        title: 'With Predefined Value',
        propsValue: 'Option 2',
    },
};

export const EmptyOptions: Story = {
    args: {
        title: 'Empty Options',
        options: [],
        placeholder: 'Нет доступных опций',
    },
};

// Стилизация
export const CustomWidth: Story = {
    args: {
        title: 'Custom Width',
        style: { width: '300px' },
    },
};

export const Narrow: Story = {
    args: {
        title: 'Narrow Select',
        style: { width: '150px' },
    },
};

// Группа состояний в одной стори
export const AllStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <Select
                title="Normal State"
                options={['Option 1', 'Option 2', 'Option 3']}
                placeholder="Выберите опцию"
            />
            <Select
                title="Disabled State"
                options={['Option 1', 'Option 2', 'Option 3']}
                placeholder="Недоступно"
                disabled
            />
            <Select
                title="With Value"
                options={['Option 1', 'Option 2', 'Option 3']}
                propsValue="Option 2"
            />
        </div>
    ),
};

// Группа разных размеров контента
export const ContentVariations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
            <Select
                title="Short Options"
                options={['A', 'B', 'C']}
                style={{ width: '200px' }}
            />
            <Select
                title="Long Options"
                options={[
                    'Very long option name that wraps',
                    'Another long description here',
                    'Short'
                ]}
                style={{ width: '300px' }}
            />
            <Select
                title="Many Options"
                options={[
                    'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',
                    'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'
                ]}
                style={{ width: '250px' }}
            />
        </div>
    ),
};

// Демонстрация фильтрации
export const WithFiltering: Story = {
    args: {
        title: 'Searchable Select',
        options: [
            'Apple',
            'Banana',
            'Cherry',
            'Date',
            'Elderberry',
            'Fig',
            'Grape',
            'Honeydew'
        ],
        placeholder: 'Начните вводить для поиска...',
    },
};

// Без заголовка
export const WithoutTitle: Story = {
    args: {
        options: ['Option 1', 'Option 2', 'Option 3'],
        placeholder: 'Простой выбор',
    },
};