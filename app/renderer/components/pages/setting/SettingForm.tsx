import { useEffect, useState } from 'react';
import {localStorageKey} from '../../../constants/local-storage-key'
import {StorageType} from '../../../interfaces/storage'
import TextInput from '../../ui/Form/TextInput'
import SettingFormUI from '../../ui/Form/SettingFormUI'

type SettingFormProps = {
  registering : boolean,
  setRegistering : any
};

const SettingForm = (props: SettingFormProps) => {
  const [csvPath, setCsvPath] = useState<string>('');
  const [csvTmpPath, setCsvTmpPath] = useState<string>('');
  const [apiIp, setApiIp] = useState<string>('');

  // ローカルストレージから設定値取得
  useEffect(() => {
    let pathes: string[] = [
        localStorageKey.CSV_PASS,
        localStorageKey.CSV_TMP_PASS,
        localStorageKey.API_IP,
    ];
    var retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    setCsvPath(retval.data[localStorageKey.CSV_PASS])
    setCsvTmpPath(retval.data[localStorageKey.CSV_TMP_PASS])
    setApiIp(retval.data[localStorageKey.API_IP])
  }, []);

  // ローカルストレージから設定値取得
  useEffect(() => {
    if (props.registering) {
      handleSettingRegister()
      props.setRegistering(false)
    }
  }, [props.registering]);

  // ローカルストレージに値登録
  async function handleSettingRegister() {
    let storageData: StorageType[] = [
        {
            path: localStorageKey.CSV_PASS,
            value: csvPath
        },
        {
          path: localStorageKey.CSV_TMP_PASS,
          value: csvTmpPath
        },
        {
          path: localStorageKey.API_IP,
          value: apiIp
        }
    ];

    global.ipcRenderer.sendSync("RegisterStorage", storageData);
  }

  return (
    <div className='w-full max-h-cus bg-white overflow-auto p-y-3 mb-2'>
      {/* <div className='w-full h-full p-y-3 mb-2'> */}
        <SettingFormUI label='絞り込み'><p>絞り込み</p></SettingFormUI>
        <SettingFormUI label='AIエンジン'><p>AIエンジン</p></SettingFormUI>
        <SettingFormUI label='アイコン設定'><p>アイコン設定</p></SettingFormUI>
        <SettingFormUI label='テーマ設定'><p>テーマ設定</p></SettingFormUI>
        <SettingFormUI label='システム設定'>
          <div className='mb-1'>
            <label className="block text-black-400 text-sm mb-1">
            csvパス
            </label>
            <TextInput value={csvPath} onChange={(e) => setCsvPath(e.target.value)} />
          </div>
          <div className='mb-1'>
            <label className="block text-black-400 text-sm mb-1">
            一時保存ファイルパス
            </label>
            <TextInput value={csvTmpPath} onChange={(e) => setCsvTmpPath(e.target.value)} />
          </div>
          <div className='mb-1'>
            <label className="block text-black-400 text-sm mb-1">
            API-IP
            </label>
            <TextInput value={apiIp} onChange={(e) => setApiIp(e.target.value)} />
          </div>
        </SettingFormUI>
      {/* </div> */}
    </div>
  );
}

  
export default SettingForm