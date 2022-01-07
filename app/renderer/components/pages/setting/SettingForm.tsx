import { useEffect, useState } from 'react';
import {localStorageKey} from '../../../constants/local-storage-key'
import {StorageType} from '../../../interfaces/storage'

type SettingFormProps = {};

const SettingForm = (props: SettingFormProps) => {
  const [csvPath, setCsvPath] = useState<string>('');
  const [apiIp, setApiIp] = useState<string>('');

  // ローカルストレージから設定値取得
  useEffect(() => {
    let pathes: string[] = [
        localStorageKey.CSV_PASS,
        localStorageKey.API_IP,
    ];
    var retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    setCsvPath(retval.data[localStorageKey.CSV_PASS])
    setApiIp(retval.data[localStorageKey.API_IP])
  }, []);

  // ローカルストレージに値登録
  async function handleSettingRegister() {
    let storageData: StorageType[] = [
        {
            path: localStorageKey.CSV_PASS,
            value: csvPath
        },
        {
          path: localStorageKey.API_IP,
          value: apiIp
        }
    ];

    global.ipcRenderer.sendSync("RegisterStorage", storageData);
  }

  return (
    <div>
        <p>csvパス</p>
        <input
            type='text'
            value={csvPath}
            onChange={(e) => setCsvPath(e.target.value)}
        />
        <p>API-IP</p>
        <input
            type='text'
            value={apiIp}
            onChange={(e) => setApiIp(e.target.value)}
        />
        <button
            type='button'
            onClick={(e) => {
            e.preventDefault();
                handleSettingRegister();
            }}
        >
            登録
        </button>
    </div>
  );
}

  
export default SettingForm