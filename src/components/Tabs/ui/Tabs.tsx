import s from './Tabs.module.scss'
import {FlexContainer} from "../../FlexContainer"

export type TabsProps = {
    tabsSettings:{ title: string,   }[]
    href?:string
    activeTabTitle:string
}

export const Tabs = ({ tabsSettings,href,activeTabTitle }: TabsProps) => {

  return (
      <FlexContainer wrap justify={'center'}>
        {tabsSettings.map(({ title }, index) => {
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




