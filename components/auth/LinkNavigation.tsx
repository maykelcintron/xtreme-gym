import Link from "next/link"

interface LinkNavigationProps {
    description?: string;
    title: string;
    href: string;
}

const LinkNavigation = ({title, href, description}: LinkNavigationProps) => {
  return (
    <p>
        {description && <span>{description}</span>}
        <Link className="text-red-500" href={href}> {title} </Link>
    </p>   
  )
}

export default LinkNavigation
