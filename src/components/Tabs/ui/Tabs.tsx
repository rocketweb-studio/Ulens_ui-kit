import s from './Tabs.module.scss'
import {FlexContainer} from "../../FlexContainer"
import  { MouseEvent } from 'react'

export type TabsProps = {
    tabsSettings:{ title: string,   }[]
    href?:string
    setActiveTab:(value:string) => void
    activeTab:string
}

export const Tabs = ({ tabsSettings,href,activeTab,setActiveTab }: TabsProps) => {
    const onClickHandler = (e:MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setActiveTab(e.currentTarget.textContent || "");
    }
  return (
      <FlexContainer wrap justify={'center'}>
        {tabsSettings.map(({ title }, index) => {
          const isActive = activeTab === title
          return (
              <a
              onClick={onClickHandler}
              href={href||""}
              key={index}
              className={`${s.link} ${isActive ? s.activeLink : ''}`}
          >
            {title}
          </a>
          )})}
      </FlexContainer>
  )}




