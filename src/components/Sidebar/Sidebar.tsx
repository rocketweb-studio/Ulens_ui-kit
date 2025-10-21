'use client'

import s from './Sidebar.module.scss'
import {ElementType, NamedExoticComponent, RefAttributes, SVGProps} from "react";

type Props = {
  sidebarLinks: {
    icon:  NamedExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>>
    title: string
    href: string
    isActive: boolean
  }[]
  LinkComponent: ElementType
}

export const Sidebar = ({sidebarLinks, LinkComponent}: Props) => {
  
  return (
    <div className={s.sidebarWrapper}>
      {sidebarLinks.map(({ title, href, isActive, icon: Icon }, i) => (
        <div className={s.linkWrapper} key={i}>
          <LinkComponent href={href} to={href} className={`${s.link} ${isActive ? s.activeLink : ''}`}>
            <Icon className={s.icon} />
            {title}
          </LinkComponent>
        </div>
      ))}
    </div>
  )
}


