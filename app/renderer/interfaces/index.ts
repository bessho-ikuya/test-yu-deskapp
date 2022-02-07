// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRenderer } from 'electron'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
}

export type User = {
  id: number
  name: string
}

export type CalcResultType = {
  receipt_code : string,
  distance : string,
  user : string[],
  recept1 : string,
  recept2 : string
}

export type CalcRequestType = {
  csv : string,
  engine : string,
  filtering : string[]
}

export type Error = {
  code: number
  errors: string[]
}
