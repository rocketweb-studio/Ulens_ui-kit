import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { RadioButtonsGroup } from './RadioButtonsGroup';
import './RadioButtonsGroup.module.scss';

type FormData = {
    gender: string;
    category: string;
    status: string;
    theme: string;
};

const meta: Meta<typeof RadioButtonsGroup> = {
    title: 'Components/RadioButtonsGroup',
    component: RadioButtonsGroup,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
        },
        register: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioButtonsGroup<FormData>>;

// Базовые опции для демонстрации
const genderOptions = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'other', label: 'Другой' },
];

const categoryOptions = [
    { value: 'electronics', label: 'Электроника' },
    { value: 'books', label: 'Книги' },
    { value: 'clothing', label: 'Одежда' },
    { value: 'home', label: 'Для дома' },
];

const statusOptions = [
    { value: 'active', label: 'Активный', disabled: false },
    { value: 'inactive', label: 'Неактивный', disabled: false },
    { value: 'pending', label: 'Ожидание', disabled: true },
];

// Контролируемый компонент для демонстрации
const ControlledRadioGroup: React.FC<React.ComponentProps<typeof RadioButtonsGroup<FormData>>> = (args) => {
    const [value, setValue] = useState('male');

    return (
        <RadioButtonsGroup<FormData>
            {...args}
            value={value}
            onChange={setValue}
        />
    );
};

export const Default: Story = {
    render: (args) => <ControlledRadioGroup {...args} />,
    args: {
        name: 'gender',
        label: 'Выберите пол',
        options: genderOptions,
        direction: 'vertical',
    },
};

export const Horizontal: Story = {
    render: (args) => {
        const [value, setValue] = useState('electronics');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        name: 'category',
        label: 'Категория товаров',
        options: categoryOptions,
        direction: 'horizontal',
    },
};

export const WithDisabledOptions: Story = {
    render: (args) => {
        const [value, setValue] = useState('active');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        name: 'status',
        label: 'Статус',
        options: statusOptions,
        direction: 'vertical',
    },
};

export const RequiredField: Story = {
    render: (args) => {
        const [value, setValue] = useState('female');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        name: 'gender',
        label: 'Обязательный выбор',
        options: genderOptions,
        required: true,
        direction: 'vertical',
    },
};

export const WithError: Story = {
    render: (args) => {
        const [value, setValue] = useState('male');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        name: 'gender',
        label: 'Выберите пол',
        options: genderOptions,
        error: 'Это поле обязательно для заполнения',
        direction: 'vertical',
    },
};

export const FullyDisabled: Story = {
    render: (args) => {
        const [value, setValue] = useState('male');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
                disabled={true}
            />
        );
    },
    args: {
        name: 'gender',
        label: 'Отключенная группа',
        options: genderOptions,
        direction: 'vertical',
    },
};

export const WithReactHookFormExample: Story = {
    args: {
        direction: "vertical"
    },

    render: () => {
        const { register } = useForm<FormData>();

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <RadioButtonsGroup<FormData>
                    name="gender"
                    label="Пол с react-hook-form"
                    options={genderOptions}
                    register={register}
                    required
                />

                <RadioButtonsGroup<FormData>
                    name="category"
                    label="Категория с react-hook-form"
                    options={categoryOptions}
                    register={register}
                    direction="horizontal"
                />
            </div>
        );
    }
};

// Playground story - контролируемая
export const Playground: Story = {
    render: (args) => {
        const [value, setValue] = useState('male');

        return (
            <RadioButtonsGroup<FormData>
                {...args}
                value={value}
                onChange={setValue}
            />
        );
    },
    args: {
        name: 'gender',
        label: 'Playground Radio Group',
        options: genderOptions,
        direction: 'vertical',
        required: false,
        disabled: false,
    },
};

// Демонстрация всех состояний - все контролируемые
export const AllStates: Story = {
    render: () => {
        const [genderValue, setGenderValue] = useState('male');
        const [categoryValue, setCategoryValue] = useState('electronics');
        const [statusValue, setStatusValue] = useState('active');
        const [requiredValue, setRequiredValue] = useState('female');
        const [errorValue, setErrorValue] = useState('male');
        const [formValue, setFormValue] = useState('male');

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '400px' }}>
                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>Обычная группа</h3>
                    <RadioButtonsGroup<FormData>
                        name="gender"
                        label="Выберите пол"
                        options={genderOptions}
                        direction="vertical"
                        value={genderValue}
                        onChange={setGenderValue}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>Горизонтальная группа</h3>
                    <RadioButtonsGroup<FormData>
                        name="category"
                        label="Категория"
                        options={categoryOptions}
                        direction="horizontal"
                        value={categoryValue}
                        onChange={setCategoryValue}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>С отключенными опциями</h3>
                    <RadioButtonsGroup<FormData>
                        name="status"
                        label="Статус"
                        options={statusOptions}
                        direction="vertical"
                        value={statusValue}
                        onChange={setStatusValue}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>Обязательное поле</h3>
                    <RadioButtonsGroup<FormData>
                        name="gender"
                        label="Обязательный выбор"
                        options={genderOptions}
                        required={true}
                        direction="vertical"
                        value={requiredValue}
                        onChange={setRequiredValue}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>С ошибкой</h3>
                    <RadioButtonsGroup<FormData>
                        name="gender"
                        label="Выберите пол"
                        options={genderOptions}
                        error="Пожалуйста, выберите значение"
                        direction="vertical"
                        value={errorValue}
                        onChange={setErrorValue}
                    />
                </div>

                <div>
                    <h3 style={{ marginBottom: '16px', color: 'white' }}>Контролируемая группа</h3>
                    <RadioButtonsGroup<FormData>
                        name="gender"
                        label="Контролируемая группа"
                        options={genderOptions}
                        direction="vertical"
                        value={formValue}
                        onChange={setFormValue}
                    />
                </div>
            </div>
        );
    },
};