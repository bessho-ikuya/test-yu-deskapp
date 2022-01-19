type Props = {
    value: string
    onChange: any
}

const TextInput = ({value, onChange}:Props) => {
    return (
        <input className="appearance-none border w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text'
            value={value}
            onChange={onChange}
        />
    )
}

export default TextInput;