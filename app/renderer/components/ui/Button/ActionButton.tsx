import Link from "next/link";

type Props = {
    label: string
    onClick: any
    disabled: boolean
    exClassName?: string
}

const ActionButton = ({label, onClick, disabled, exClassName=""}:Props) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`px-7 py-2 text-sm bg-gray-100 text-black ${exClassName} font-normal hover:bg-white`} style={{boxShadow: 'inset 1px 1px 0px #656565, inset -1px -1px 0px #626262, inset -3px -3px 0px #9D9D9D, inset 4px 4px 0px #FFFFFF'}}>{label}</button>
    )
}

export default ActionButton;