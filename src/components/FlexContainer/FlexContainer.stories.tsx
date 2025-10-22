import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexContainer } from './FlexContainer';
import './FlexContainer.module.scss';

const meta: Meta<typeof FlexContainer> = {
    title: 'Components/FlexContainer',
    component: FlexContainer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        children:{
            table: {
                disable: true
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof FlexContainer>;

// Базовый пример с элементами для демонстрации
const DemoItems = () => (
    <>
        <div style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>
            Item 1
        </div>
        <div style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }}>
            Item 2
        </div>
        <div style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px' }}>
            Item 3
        </div>
    </>
);

export const Default: Story = {
    args: {
        children: <DemoItems />,
    },
};

export const RowDirection: Story = {
    args: {
        children: <DemoItems />,
        direction: 'row',
    },
};

export const ColumnDirection: Story = {
    args: {
        children: <DemoItems />,
        direction: 'column',
        style: { height: '200px' },
    },
};

export const JustifyCenter: Story = {
    args: {
        children: <DemoItems />,
        justify: 'center',
    },
};

export const JustifyBetween: Story = {
    args: {
        children: <DemoItems />,
        justify: 'between',
    },
};

export const JustifyAround: Story = {
    args: {
        children: <DemoItems />,
        justify: 'around',
    },
};

export const AlignCenter: Story = {
    args: {
        children: (
            <>
                <div style={{ padding: '20px', backgroundColor: '#007bff', color: 'white' }}>Tall Item</div>
                <div style={{ padding: '10px', backgroundColor: '#28a745', color: 'white' }}>Short</div>
                <div style={{ padding: '30px', backgroundColor: '#dc3545', color: 'white' }}>Very Tall Item</div>
            </>
        ),
        align: 'center',
        style: { height: '150px' },
    },
};

export const WithGap: Story = {
    args: {
        children: <DemoItems />,
        gap: 20,
    },
};

export const WithWrap: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            padding: '10px',
                            backgroundColor: `hsl(${i * 45}, 70%, 60%)`,
                            color: 'white',
                            borderRadius: '4px',
                            minWidth: '100px',
                        }}
                    >
                        Item {i + 1}
                    </div>
                ))}
            </>
        ),
        wrap: true,
        gap: 10,
        style: { maxWidth: '400px' },
    },
};

export const ComplexExample: Story = {
    args: {
        children: (
            <>
                <div style={{ padding: '15px', backgroundColor: '#6f42c1', color: 'white', borderRadius: '4px' }}>
                    Header
                </div>
                <div style={{ padding: '15px', backgroundColor: '#fd7e14', color: 'white', borderRadius: '4px' }}>
                    Content
                </div>
                <div style={{ padding: '15px', backgroundColor: '#20c997', color: 'white', borderRadius: '4px' }}>
                    Footer
                </div>
            </>
        ),
        direction: 'column',
        justify: 'between',
        align: 'center',
        gap: 10,
        style: { height: '300px', border: '1px dashed #ccc', padding: '10px' },
    },
};

export const WithCustomClassName: Story = {
    args: {
        children: <DemoItems />,
        className: 'custom-flex-class',
        gap: 15,
    },
};

export const ResponsiveExample: Story = {
    args: {
        children: (
            <>
                <div style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', flex: '1' }}>
                    Flexible
                </div>
                <div style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', flex: '2' }}>
                    More Flexible
                </div>
                <div style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', flex: '1' }}>
                    Flexible
                </div>
            </>
        ),
        gap: 10,
    },
};

// Пример с разными типами gap
export const DifferentGaps: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
                <h4>Number gap (20px)</h4>
                <FlexContainer gap={20}>
                    <DemoItems />
                </FlexContainer>
            </div>
            <div>
                <h4>String gap (1rem)</h4>
                <FlexContainer gap="1rem">
                    <DemoItems />
                </FlexContainer>
            </div>
            <div>
                <h4>String gap (10px 20px)</h4>
                <FlexContainer gap="10px 20px">
                    <DemoItems />
                </FlexContainer>
            </div>
        </div>
    ),
};

// Пример со всеми направлениями
export const AllDirections: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((direction) => (
                <div key={direction}>
                    <h4>Direction: {direction}</h4>
                    <FlexContainer direction={direction} gap={10} style={{ border: '1px solid #eee', padding: '10px' }}>
                        <DemoItems />
                    </FlexContainer>
                </div>
            ))}
        </div>
    ),
};