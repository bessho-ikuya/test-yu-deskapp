type Props = {
    name: string;
    items: any;
    imageLabel: boolean;
    state: React.SetStateAction<string>;
    setState: any;
}

const RadioInput = ({name, items, state, imageLabel, setState}:Props) => {
    return (
        <div className="flex flex-wrap">
            {items.map((item, index) => (
                <div className="flex items-center m-2" key={index}>
                    <input type="radio" id={name+index} name={name} value={item.value} checked={item.value === state} onChange={() => {setState(item.value)}} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                    {imageLabel ? (
                        <label htmlFor={name+index} className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <img className="h-28" src={item.label} alt="" />
                        </label>
                    ) : (
                        <label htmlFor={name+index} className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {item.label}
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RadioInput;