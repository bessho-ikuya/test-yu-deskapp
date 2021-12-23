import Link from "next/link";

type Props = {
    label: string
    href: string
    color: string
}

const LinkButton = ({label, href, color}:Props) => {
    return (
        <Link href={href}><a className={`px-4 py-1 text-sm bg-white text-${color} font-normal hover:bg-white border-${color} border-2 border-solid`}>{label}</a></Link>
    )
}

export default LinkButton;