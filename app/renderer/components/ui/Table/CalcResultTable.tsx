import {CalcResultType} from '../../../interfaces/index'

type Props = {
    headers: string[]
    calcResults: CalcResultType[],
    setBadActionId: any,
    setGoodActionId: any,
    setBadActionUser: any,
    setGoodActionUser: any,
}

const CalcResultTable = ({
    headers, 
    calcResults, 
    setBadActionId, 
    setBadActionUser, 
    setGoodActionId, 
    setGoodActionUser
}:Props) => {
    const handleBadClick = (id:string, user: string[]) => {
        setBadActionId(id)
        setBadActionUser(user)
    }
    const handleGoodClick = (id:string, user: string[]) => {
        setGoodActionId(id)
        setGoodActionUser(user)
    }
    return (
        <table className="bg-white w-full">
            <tr>
                {headers.map((header:string, key:number)=> (
                    <th key={key + `__head`} className="bg-gray-100 border px-2 py-2 text-base">{header}</th>
                ))}
            </tr>
            {calcResults?.map((calcResult: CalcResultType, iskey:number)=> (
                <tr key={iskey + `__row`}>
                    <td className="border text-left px-2 py-2 text-sm">{iskey}</td>
                    <td className="border text-left px-2 py-2 text-sm">{calcResult.receipt_code}</td>
                    <td className="border text-left px-2 py-2 text-sm">{calcResult.distance}</td>
                    <td className="border text-left px-2 py-2 text-sm">{calcResult.recept1}</td>
                    <td className="border text-left px-2 py-2 text-sm">{calcResult.recept2}</td>
                    <td className="border text-left px-2 py-2 text-sm">
                        <button onClick={()=> handleGoodClick(calcResult.receipt_code, calcResult.user)} className="px-4 py-1 text-sm bg-blue-500 text-white font-normal mr-2">Good</button>
                        <button onClick={()=> handleBadClick(calcResult.receipt_code, calcResult.user)} className="px-4 py-1 text-sm bg-red-500 text-white font-normal">Bad</button>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default CalcResultTable