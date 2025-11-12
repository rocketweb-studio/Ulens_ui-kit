import { motion } from 'framer-motion'
import s from './Tabs.module.scss'
import { FlexContainer } from "../../FlexContainer"
import {useState} from "react";

export type TabsProps = {
  tabsSettings:{ title: string }[]
  openActiveTab?:(active:string) => void
}

export const Tabs = ({ tabsSettings,openActiveTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabsSettings[0].title)

  const handleClick = (active:string) => {
      setActiveTab(active)
      if(openActiveTab){
          openActiveTab(active)
      }

  }

  return (
      <FlexContainer wrap justify={'center'}>
        {tabsSettings.map(({ title }, index) => {
          const isActive = activeTab === title
          return <button
              key={index}
              onClick={() => handleClick(title)}
              className={`${s.link} ${isActive? s.activeLink : ''}`}
          >
            {title}
            {isActive && (
                <motion.div
                    layoutId="activeTab"
                    className={s.activeIndicator}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                />
            )}
          </button>
        })}
      </FlexContainer>
          )
}

