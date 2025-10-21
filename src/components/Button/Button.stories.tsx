import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button.tsx';

const ArrowIcon = () => <span>→</span>;
const StarIcon = () => <span>⭐</span>;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'text', 'text-white', 'in-text', 'darken'],
      description: 'Внешний вид кнопки',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'inherit'],
      description: 'Размер кнопки',
    },
    tagType: {
      control: { type: 'radio' },
      options: ['button', 'link'],
      description: 'Тип элемента - button или link',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Растянуть на всю ширину',
    },
    isLoading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    underlineText: {
      control: 'boolean',
      description: 'Подчеркнутый текст',
    },
    withoutPadding: {
      control: 'boolean',
      description: 'Без отступов',
    },
    leftIcon: {
      control: false,
      description: 'Иконка слева',
    },
    rightIcon: {
      control: false,
      description: 'Иконка справа',
    },
    centredIcon: {
      control: false,
      description: 'Центральная иконка (без текста)',
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые сторисы по вариантам
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const TextWhite: Story = {
  args: {
    variant: 'text-white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const InText: Story = {
  args: {
    variant: 'in-text',
  },
};

export const Darken: Story = {
  args: {
    variant: 'darken',
  },
};

// Сторисы по размерам
export const Small: Story = {
  args: {
    size: 'small',
    variant: 'primary',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'primary',
  },
};

// Сторисы с иконками
export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    leftIcon: <StarIcon />,
    children: 'Favorite',
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'outline',
    rightIcon: <ArrowIcon />,
    children: 'Continue',
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'secondary',
    leftIcon: <StarIcon />,
    rightIcon: <ArrowIcon />,
    children: 'Actions',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'text',
    centredIcon: <StarIcon />,
    children: null,
    'aria-label': 'Favorite',
  },
};

// Состояния
export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

export const LoadingAndDisabled: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    disabled: true,
    children: 'Loading...',
  },
};

// Особые случаи
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const UnderlineText: Story = {
  args: {
    variant: 'text',
    underlineText: true,
    children: 'Underlined Text',
  },
};

export const WithoutPadding: Story = {
  args: {
    variant: 'text',
    withoutPadding: true,
    children: 'No Padding',
  },
};

// Link вариант
export const AsLink: Story = {
  args: {
    tagType: 'link',
    href: 'https://example.com',
    variant: 'outline',
    children: 'Open Link',
  },
};

// Комбинации
export const PrimaryWithIconLoading: Story = {
  args: {
    variant: 'primary',
    leftIcon: <StarIcon />,
    isLoading: true,
    children: 'Processing',
  },
};

export const SmallOutlineWithIcon: Story = {
  args: {
    variant: 'outline',
    size: 'small',
    rightIcon: <ArrowIcon />,
    children: 'Next',
  },
};

// Группа состояний в одной стори
export const AllStates: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Button variant="primary">Normal</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" isLoading>Loading</Button>
        <Button variant="primary" leftIcon={<StarIcon />}>With Icon</Button>
      </div>
  ),
};

// Группа размеров в одной стори
export const SizeComparison: Story = {
  render: () => (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="medium">Medium</Button>
        <Button variant="primary" size="large">Large</Button>
      </div>
  ),
};

// Группа вариантов в одной стори
export const VariantComparison: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="text">Text</Button>
        <Button variant="darken">Darken</Button>
      </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
};
