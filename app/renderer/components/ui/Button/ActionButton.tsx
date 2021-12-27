import Link from "next/link";

type Props = {
    label: string
    color: string
    onClick: any
}

const ActionButton = ({label, color, onClick}:Props) => {
    return (
        <button onClick={onClick} className={`px-4 py-1 text-sm bg-white text-${color} font-normal hover:bg-white border-${color} border-2 border-solid`}>{label}</button>
    )
}

export default ActionButton;