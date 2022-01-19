import Link from "next/link";

type Props = {
    label: string
    href: string
}

const LinkButton = ({label, href}:Props) => {
    return (
        <Link href={href}><a className={`px-7 py-2 text-sm bg-gray-100 text-black font-normal hover:bg-white`} style={{boxShadow: 'inset 1px 1px 0px #656565, inset -1px -1px 0px #626262, inset -3px -3px 0px #9D9D9D, inset 4px 4px 0px #FFFFFF'}}>{label}</a></Link>
    )
}

export default LinkButton;