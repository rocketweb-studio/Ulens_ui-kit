import { useState, useMemo } from 'react';
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
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', age: 31, role: 'Designer', status: 'inactive', joinDate: '2022-08-14' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', age: 27, role: 'Developer', status: 'active', joinDate: '2023-04-01' },
    { id: 8, name: 'Henry Zhang', email: 'henry@example.com', age: 33, role: 'Manager', status: 'active', joinDate: '2021-12-20' },
    { id: 9, name: 'Ivan Petrov', email: 'ivan@example.com', age: 26, role: 'Developer', status: 'active', joinDate: '2023-05-12' },
    { id: 10, name: 'Julia Roberts', email: 'julia@example.com', age: 30, role: 'Designer', status: 'active', joinDate: '2022-09-18' },
    { id: 11, name: 'Kevin Adams', email: 'kevin@example.com', age: 34, role: 'Analyst', status: 'inactive', joinDate: '2021-11-30' },
    { id: 12, name: 'Lisa Wang', email: 'lisa@example.com', age: 28, role: 'Developer', status: 'active', joinDate: '2023-06-22' },
    { id: 13, name: 'Michael Brown', email: 'michael@example.com', age: 31, role: 'Manager', status: 'active', joinDate: '2022-03-14' },
    { id: 14, name: 'Nancy Green', email: 'nancy@example.com', age: 29, role: 'Designer', status: 'inactive', joinDate: '2023-01-08' },
    { id: 15, name: 'Oliver Taylor', email: 'oliver@example.com', age: 27, role: 'Developer', status: 'active', joinDate: '2023-07-19' },
    { id: 16, name: 'Patricia Clark', email: 'patricia@example.com', age: 33, role: 'Analyst', status: 'active', joinDate: '2021-08-25' },
    { id: 17, name: 'Robert Lewis', email: 'robert@example.com', age: 35, role: 'Manager', status: 'inactive', joinDate: '2022-12-05' },
    { id: 18, name: 'Sarah Walker', email: 'sarah@example.com', age: 26, role: 'Developer', status: 'active', joinDate: '2023-08-30' },
    { id: 19, name: 'Thomas Hall', email: 'thomas@example.com', age: 32, role: 'Designer', status: 'active', joinDate: '2022-06-11' },
    { id: 20, name: 'Victoria Young', email: 'victoria@example.com', age: 28, role: 'Analyst', status: 'active', joinDate: '2023-03-27' },
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
        render: (value: any) => (
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
                render: (value: any) => (
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

// Простое внешнее управление пагинацией
export const ExternallyControlledPagination: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(3);

        const handlePageChange = (page: number, newPageSize: number) => {
            console.log('Page changed:', page, 'Page size:', newPageSize);
            setCurrentPage(page);
            setPageSize(newPageSize);
        };

        return (
            <div>
                <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>Внешнее состояние:</h4>
                    <div>Текущая страница: <strong>{currentPage}</strong></div>
                    <div>Размер страницы: <strong>{pageSize}</strong></div>
                    <div>Показано записей: <strong>{Math.min(pageSize, mockUsers.length - (currentPage - 1) * pageSize)}</strong></div>
                </div>

                <CustomTable<User>
                    data={mockUsers}
                    columns={userColumns}
                    paginated={true}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
            </div>
        );
    },
};

// Внешнее управление с фильтрацией
export const ExternallyControlledWithFiltering: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(4);
        const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

        const filteredData = useMemo(() => {
            if (statusFilter === 'all') return mockUsers;
            return mockUsers.filter(user => user.status === statusFilter);
        }, [statusFilter]);

        const handlePageChange = (page: number, newPageSize: number) => {
            setCurrentPage(page);
            setPageSize(newPageSize);
        };

        // Сбрасываем на первую страницу при изменении фильтра
        const handleFilterChange = (newFilter: 'all' | 'active' | 'inactive') => {
            setStatusFilter(newFilter);
            setCurrentPage(1);
        };

        return (
            <div>
                <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center'
                }}>
                    <div>
                        <label style={{ marginRight: '8px' }}>Фильтр по статусу:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
                            style={{ padding: '4px 8px' }}
                        >
                            <option value="all">Все</option>
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                        </select>
                    </div>

                    <div style={{ marginLeft: 'auto' }}>
                        <div>Страница: <strong>{currentPage}</strong></div>
                        <div>Всего записей: <strong>{filteredData.length}</strong></div>
                    </div>
                </div>

                <CustomTable<User>
                    data={filteredData}
                    columns={userColumns}
                    paginated={true}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
            </div>
        );
    },
};

// Внешнее управление с поиском
export const ExternallyControlledWithSearch: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(3);
        const [searchTerm, setSearchTerm] = useState('');

        const filteredData = useMemo(() => {
            if (!searchTerm) return mockUsers;

            const term = searchTerm.toLowerCase();
            return mockUsers.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.role.toLowerCase().includes(term)
            );
        }, [searchTerm]);

        const handlePageChange = (page: number, newPageSize: number) => {
            setCurrentPage(page);
            setPageSize(newPageSize);
        };

        const handleSearchChange = (term: string) => {
            setSearchTerm(term);
            setCurrentPage(1); // Сбрасываем на первую страницу при поиске
        };

        return (
            <div>
                <div style={{
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px'
                }}>
                    <div style={{ marginBottom: '8px' }}>
                        <label style={{ marginRight: '8px' }}>Поиск:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Поиск по имени, email или роли..."
                            style={{
                                padding: '4px 8px',
                                width: '300px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                        <div>Найдено записей: <strong>{filteredData.length}</strong></div>
                        <div>Страница: <strong>{currentPage}</strong></div>
                        <div>Размер страницы: <strong>{pageSize}</strong></div>
                    </div>
                </div>

                <CustomTable<User>
                    data={filteredData}
                    columns={userColumns}
                    paginated={true}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
            </div>
        );
    },
};

// Комбинированный пример с фильтрацией, поиском и сортировкой
export const ExternallyControlledAdvanced: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(4);
        const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
        const [roleFilter, setRoleFilter] = useState('all');
        const [searchTerm, setSearchTerm] = useState('');

        const roles = useMemo(() => {
            return Array.from(new Set(mockUsers.map(user => user.role)));
        }, []);

        const filteredData = useMemo(() => {
            let result = mockUsers;

            // Применяем поиск
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                result = result.filter(user =>
                    user.name.toLowerCase().includes(term) ||
                    user.email.toLowerCase().includes(term)
                );
            }

            // Применяем фильтр по статусу
            if (statusFilter !== 'all') {
                result = result.filter(user => user.status === statusFilter);
            }

            // Применяем фильтр по роли
            if (roleFilter !== 'all') {
                result = result.filter(user => user.role === roleFilter);
            }

            return result;
        }, [searchTerm, statusFilter, roleFilter]);

        const handlePageChange = (page: number, newPageSize: number) => {
            setCurrentPage(page);
            setPageSize(newPageSize);
        };

        const handleFilterChange = () => {
            setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
        };

        return (
            <div>
                <div style={{
                    marginBottom: '16px',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                }}>
                    <h4 style={{ margin: '0 0 12px 0' }}>Управление данными</h4>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Поиск:</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleFilterChange();
                                }}
                                placeholder="Имя или email..."
                                style={{
                                    padding: '6px 8px',
                                    width: '200px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Статус:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value as 'all' | 'active' | 'inactive');
                                    handleFilterChange();
                                }}
                                style={{ padding: '6px 8px', width: '120px' }}
                            >
                                <option value="all">Все статусы</option>
                                <option value="active">Активные</option>
                                <option value="inactive">Неактивные</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Роль:</label>
                            <select
                                value={roleFilter}
                                onChange={(e) => {
                                    setRoleFilter(e.target.value);
                                    handleFilterChange();
                                }}
                                style={{ padding: '6px 8px', width: '140px' }}
                            >
                                <option value="all">Все роли</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                            <div style={{ fontSize: '14px' }}>Найдено: <strong>{filteredData.length}</strong></div>
                            <div style={{ fontSize: '14px' }}>Страница: <strong>{currentPage}</strong></div>
                        </div>
                    </div>
                </div>

                <CustomTable<User>
                    data={filteredData}
                    columns={userColumns}
                    paginated={true}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
            </div>
        );
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
