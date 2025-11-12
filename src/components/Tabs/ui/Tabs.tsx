import { motion } from 'framer-motion'
import s from './Tabs.module.scss'
import { FlexContainer } from "../../FlexContainer"
import { useNavigate } from 'react-router-dom'
import {useState} from "react";

export type Props = {
  tabsSettings:{ title: string, href?: string }[]
  openActiveTab?:(active:string) => void
}

export const Tabs = ({ tabsSettings,openActiveTab }: Props) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>(tabsSettings[0].title)

  const handleClick = (active:string,href?: string) => {
      setActiveTab(active)
      if(openActiveTab){
          openActiveTab(active)
      }
    if (href && !active) {
      navigate(href)
    }
  }

  return (
      <FlexContainer wrap justify={'center'}>
        {tabsSettings.map(({ title, href,  }, index) => {
          const isActive = activeTab === title
          return <button
              key={index}
              onClick={() => handleClick(title, href)}
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

