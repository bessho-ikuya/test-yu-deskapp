import React, { Children, ReactNode } from 'react'

type SettingFormProps = {
    children: ReactNode,
    label: string
};
  
const SettingFormUI = (props: SettingFormProps) => {
    return (
        <div className='grid grid-cols-3 p-4 border-b-2'>
          <div className=''>
            <p className='text-sm'>{props.label}</p>
          </div>
          <div className='col-span-2'>
            {props.children}
          </div>
        </div>
    )
}
export default SettingFormUI