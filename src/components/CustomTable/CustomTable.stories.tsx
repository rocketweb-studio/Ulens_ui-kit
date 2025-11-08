import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomTable } from './CustomTable.tsx';
import { Column } from './types';

// Тип данных для демонстрации
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: string;
    status: 'active' | 'inactive';
    joinDate: string;
}

// Моковые данные
const mockUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Developer', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 32, role: 'Designer', status: 'active', joinDate: '2022-11-20' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', age: 25, role: 'Manager', status: 'inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', age: 35, role: 'Developer', status: 'active', joinDate: '2021-07-05' },
    { id: 5, name: 'Eva Brown', email: 'eva@example.com', age: 29, role: 'Analyst', status: 'active', joinDate: '2023-02-28' },
];

// Базовые колонки для пользователей
const userColumns: Column<User>[] = [
    { key: 'id', title: 'ID', width: '60px', sortable: true },
    { key: 'name', title: 'Full Name', width: '200px', sortable: true },
    { key: 'email', title: 'Email', width: '250px', sortable: true },
    { key: 'age', title: 'Age', width: '80px', sortable: true },
    { key: 'role', title: 'Role', width: '120px', sortable: true },
    {
        key: 'status',
        title: 'Status',
        width: '100px',
        render: (value: any, row: User) => (
            <span style={{
                color: value === 'active' ? '#4CAF50' : '#F44336',
                fontWeight: 'bold'
            }}>
        {String(value)}
      </span>
        )
    },
    { key: 'joinDate', title: 'Join Date', width: '120px', sortable: true },
];

const meta = {
    title: 'Components/CustomTable',
    component: CustomTable<User>,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            control: false,
        },
        columns: {
            control: false,
        },
        className: {
            control: 'text',
        },
        paginated: {
            control: 'boolean',
        },
    },
    args: {
        data: mockUsers,
        columns: userColumns,
        paginated: false,
    },
} satisfies Meta<typeof CustomTable<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые сторисы
export const Basic: Story = {
    args: {
        data: mockUsers.slice(0, 3),
    },
};

export const WithPagination: Story = {
    args: {
        data: mockUsers,
        paginated: true,
    },
};

export const Sortable: Story = {
    args: {
        data: mockUsers,
        columns: userColumns.map(col => ({ ...col, sortable: true })),
    },
};

export const EmptyTable: Story = {
    args: {
        data: [],
        columns: userColumns,
    },
};

export const SingleItem: Story = {
    args: {
        data: [mockUsers[0]],
        columns: userColumns,
    },
};

// Сторисы с кастомным рендерингом
export const CustomRendering: Story = {
    args: {
        data: mockUsers,
        columns: [
            { key: 'name', title: 'User', width: '200px', sortable: true },
            {
                key: 'email',
                title: 'Contact',
                width: '250px',
                render: (value: any, row: User) => (
                    <div>
                        <div>{String(value)}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            {row.role}
                        </div>
                    </div>
                )
            },
            {
                key: 'status',
                title: 'Actions',
                width: '120px',
                render: (value: any, row: User) => (
                    <button
                        style={{
                            padding: '4px 8px',
                            backgroundColor: value === 'active' ? '#4CAF50' : '#757575',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {value === 'active' ? 'Active' : 'Inactive'}
                    </button>
                )
            },
        ] as Column<User>[],
    },
};

// Дополнительные примеры с другими типами данных
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

const mockProducts: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, inStock: true },
    { id: 2, name: 'Desk Chair', category: 'Furniture', price: 199.99, inStock: true },
    { id: 3, name: 'Coffee Mug', category: 'Kitchen', price: 12.99, inStock: false },
];

const productColumns: Column<Product>[] = [
    { key: 'id', title: 'ID', width: '60px', sortable: true },
    { key: 'name', title: 'Product Name', width: '150px', sortable: true },
    { key: 'category', title: 'Category', width: '120px', sortable: true },
    {
        key: 'price',
        title: 'Price',
        width: '100px',
        sortable: true,
        render: (value: any) => `$${Number(value).toFixed(2)}`
    },
    {
        key: 'inStock',
        title: 'Stock',
        width: '100px',
        render: (value: any) => (
            <span style={{
                color: value ? '#4CAF50' : '#F44336',
                fontWeight: 'bold'
            }}>
        {value ? 'In Stock' : 'Out of Stock'}
      </span>
        )
    },
];

export const ProductsTable: Story = {
    args: {
        data: mockProducts,
        columns: productColumns,
    },
};

// Сторисы с рендер функциями
export const AllStates = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4>Базовая таблица</h4>
                <CustomTable<User>
                    data={mockUsers.slice(0, 2)}
                    columns={userColumns}
                />
            </div>
            <div>
                <h4>С пагинацией</h4>
                <CustomTable<User>
                    data={mockUsers}
                    columns={userColumns}
                    paginated={true}
                />
            </div>
            <div>
                <h4>Пустая таблица</h4>
                <CustomTable<User>
                    data={[]}
                    columns={userColumns}
                />
            </div>
        </div>
    ),
};

export const SizeVariants = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h4>Маленький набор данных</h4>
                <CustomTable<User>
                    data={mockUsers.slice(0, 2)}
                    columns={userColumns.slice(0, 3)}
                />
            </div>
            <div>
                <h4>Большой набор данных с пагинацией</h4>
                <CustomTable<User>
                    data={[...mockUsers, ...mockUsers, ...mockUsers]}
                    columns={userColumns}
                    paginated={true}
                />
            </div>
        </div>
    ),
};
