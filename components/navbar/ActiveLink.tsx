"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './ActiveLink.module.css'

interface Props {
  path: string
  text?: string
  children?: React.ReactNode
}

export const ActiveLink = ({ path, text, children }: Props) => {
  const pathName = usePathname()

  return (
    <Link className={`${style.link} ${pathName === path ? style['active-link'] : ''}`} href={path}>
      {children ?? text}
    </Link>
  )
}

export default ActiveLink
