type Props = {
    name: string;
    items: any;
    state: string[];
    setState: any;
}

const CheckboxInput = ({name, items, state, setState}:Props) => {
    return (
        <div className="flex flex-wrap">
            {items.map((item, index) => (
                <div className="flex items-center m-2">
                    <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        id={name + "-" + index}
                        type="checkbox"
                        value={item.value}
                        onChange={() => {
                            if (state.includes(item.value)) {
                                setState([...state.filter((fitem) => fitem !== item.value)]);
                            } else {
                                setState([...state.concat([item.value])]);
                            }
                        }}
                        checked={state.includes(item.value)}
                    />
                    <label className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={name + "-" + index}>{ item.label }</label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxInput;