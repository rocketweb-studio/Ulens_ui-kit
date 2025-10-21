import type {Meta, StoryObj} from '@storybook/react-vite';

import {Sidebar} from './Sidebar';
import {IconCreditCardOutline, IconImageOutline, IconPerson, IconTrendingUp} from "../../assets/icons/components";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarLinks = [
  {
    icon: IconPerson,
    title: 'Users list',
    href: '/Users-list',
    isActive: true,
  },
  {
    icon: IconTrendingUp,
    title: 'Statistics',
    href: '/asd',
    isActive: false,
  },
  {
    icon: IconCreditCardOutline,
    title: 'Payments list',
    href: '/asd',
    isActive: true,
  },
  {
    icon: IconImageOutline,
    title: 'Posts list',
    href: '/asd',
    isActive: true,
  },

]

export const Primary: Story = {
  args: {
    sidebarLinks: sidebarLinks,
    LinkComponent: 'a',
  }
}

// export const Secondary = () => {
//
//
//
//   return (
//     <Sidebar sidebarLinks={setPaginationData} LinkComponent={100}/>
//   )
// }