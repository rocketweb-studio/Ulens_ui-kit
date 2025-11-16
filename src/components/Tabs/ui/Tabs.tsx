import s from './Tabs.module.scss'
import {FlexContainer} from "../../FlexContainer"

export type TabsProps = {
  tabsSettings:{ title: string, activeTabTitle:string, href?:string }[]
}

export const Tabs = ({ tabsSettings }: TabsProps) => {

  return (
      <FlexContainer wrap justify={'center'}>
        {tabsSettings.map(({ title,activeTabTitle,href }, index) => {
          const isActive = activeTabTitle === title
          return <a
              href={href||""}
              key={index}
              className={`${s.link} ${isActive ? s.activeLink : ''}`}

          >
            {title}
          </a>
        })}
      </FlexContainer>
  )}




