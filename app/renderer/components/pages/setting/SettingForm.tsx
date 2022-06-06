import { useEffect, useState } from 'react';
import {localStorageKey} from '../../../constants/local-storage-key'
import {StorageType} from '../../../interfaces/storage'
import TextInput from '../../ui/Form/TextInput'
import SettingFormUI from '../../ui/Form/SettingFormUI'
import Radio from '../../ui/Form/Radio'
import CheckboxInput from '../../ui/Form/Checkbox'
import SelectboxInput from '../../ui/Form/Selectbox'
import {botMessageTemplate} from '../../../constants/bot-message'
import {AiEngineRadio} from '../../../constants/ai-engine'
import {SortSettingType} from '../../../interfaces/index'
import {FilterCheckbox} from '../../../constants/filtering'
import {themeDatas, themeIcons} from '../../../constants/theme-list'

type SettingFormProps = {
  registering : boolean,
  setRegistering : any,
  setBotMessage : any
};

const SettingForm = (props: SettingFormProps) => {
  const [csvPath, setCsvPath] = useState<string>('');
  const [csvTmpPath, setCsvTmpPath] = useState<string>('');
  const [appCloseTrigerPass, setAppCloseTrigerPass] = useState<string>('');
  const [apiIp, setApiIp] = useState<string>('');
  const [aiEngine, setAiEngine] = useState<string>('');
  const [filter, setFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<SortSettingType>();
  const [sortMaxDistance, setSortMaxDistance] = useState<number>();
  const [sortDisplayNumber, setSortDisplayNumber] = useState<number>();
  const [icon, setIcon] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [evaluateOption, setEvaluateOption] = useState<string>('');  

  const EvalRadio = [
    {
      value : "on",
      label : "on",
    },
    {
      value : "off",
      label : "off",
    },
  ];

  useEffect(() => {
    fetchSetting()
  }, []);
  
  // ローカルストレージから設定値取得
  async function fetchSetting() {
    let pathes: string[] = [
      localStorageKey.CSV_PASS,
      localStorageKey.CSV_TMP_PASS,
      localStorageKey.APP_CLOSE_TRIGER_PASS,
      localStorageKey.API_IP,
      localStorageKey.FILTER_SETTING,
      localStorageKey.SORT_SETTING,
      localStorageKey.AI_ENGINE,
      localStorageKey.ICON,
      localStorageKey.THEME,
      localStorageKey.EVALUATE_OPTION,
    ];
    var retval = global.ipcRenderer.sendSync("FetchStorage", pathes);
    setCsvPath(retval.data[localStorageKey.CSV_PASS])
    setCsvTmpPath(retval.data[localStorageKey.CSV_TMP_PASS])
    setAppCloseTrigerPass(retval.data[localStorageKey.APP_CLOSE_TRIGER_PASS])
    setApiIp(retval.data[localStorageKey.API_IP])
    setAiEngine(retval.data[localStorageKey.AI_ENGINE])
    setFilter(retval.data[localStorageKey.FILTER_SETTING])
    setIcon(retval.data[localStorageKey.ICON])
    setTheme(retval.data[localStorageKey.THEME])
    setEvaluateOption(retval.data[localStorageKey.EVALUATE_OPTION])

    // ソートデータ
    let sortTmp:SortSettingType = retval.data[localStorageKey.SORT_SETTING]
    setSort(sortTmp)
    setSortDisplayNumber(Number(sortTmp.display_number))
    setSortMaxDistance(Number(sortTmp.max_distance))
  }

  // ローカルストレージに値登録
  useEffect(() => {
    if (props.registering) {
      handleSettingRegister()
      props.setRegistering(false)
    }
  }, [props.registering]);

  // 検索結果ソート値
  useEffect(() => {
    setSort({
      max_distance:sortMaxDistance,
      display_number:sortDisplayNumber
    })
  }, [sortMaxDistance, sortDisplayNumber]);

  // ローカルストレージに値登録
  async function handleSettingRegister() {
    // console.log(sort)
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
          path: localStorageKey.APP_CLOSE_TRIGER_PASS,
          value: appCloseTrigerPass
        },
        {
          path: localStorageKey.API_IP,
          value: apiIp
        },
        {
          path: localStorageKey.AI_ENGINE,
          value: aiEngine
        },
        {
          path: localStorageKey.FILTER_SETTING,
          value: filter
        },
        {
          path: localStorageKey.SORT_SETTING,
          value: sort
        },
        {
          path: localStorageKey.ICON,
          value: icon
        },
        {
          path: localStorageKey.THEME,
          value: theme
        },
        {
          path: localStorageKey.EVALUATE_OPTION,
          value: evaluateOption
        }
    ];

    global.ipcRenderer.sendSync("RegisterStorage", storageData);
    props.setBotMessage(botMessageTemplate['setting.success'])
  }

  let sortMaxDistanceList:any = [];
  for (let sortMaxDistanceListIndex = 1; sortMaxDistanceListIndex <= 99; sortMaxDistanceListIndex++) {
    sortMaxDistanceList.push({
      value: sortMaxDistanceListIndex,
      label: String(sortMaxDistanceListIndex),
    });
  }

  let sortDisplayNumberList:any = [
    {
      value: 1000,
      label: "全件",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    }
  ];

  return (
    <div className='w-full max-h-setting-cus bg-white overflow-auto p-y-3 mb-2'>
      {/* <div className='w-full h-full p-y-3 mb-2'> */}
        <SettingFormUI label='絞り込み'>
          <div>
            <CheckboxInput name={"filter"} items={FilterCheckbox} state={filter} setState={setFilter}/>
          </div>
        </SettingFormUI>
        <SettingFormUI label='AIエンジン'>
          <div>
            <Radio name={"ai-engine"} imageLabel={false} items={AiEngineRadio} state={aiEngine} setState={setAiEngine}/>
          </div>
        </SettingFormUI>
        <SettingFormUI label='計算結果表示設定'>
          <div className='mb-2'>
            <SelectboxInput name={"sort-max-distance"} label="表示上限確度" items={sortMaxDistanceList} state={sortMaxDistance} setState={setSortMaxDistance}/>
          </div>
          <div>
            <SelectboxInput name={"sort-display-number"} label="表示件数" items={sortDisplayNumberList} state={sortDisplayNumber} setState={setSortDisplayNumber}/>
          </div>
        </SettingFormUI>
        <SettingFormUI label='Good/Bad評価'>
          <div>
            <Radio name={"eval"} imageLabel={false} items={EvalRadio} state={evaluateOption} setState={setEvaluateOption}/>
          </div>
        </SettingFormUI>
        <SettingFormUI label='テーマ設定'>
          <SelectboxInput name={"theme"} items={themeDatas} state={theme} setState={setTheme}/>
        </SettingFormUI>
        <SettingFormUI label='アイコン設定'>
          {!!theme && (
            <Radio name={"icon"} imageLabel={true} items={themeIcons[theme]} state={icon} setState={setIcon}/>
          )}
        </SettingFormUI>
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
            アプリ自動削除判定ファイルパス
            </label>
            <TextInput value={appCloseTrigerPass} onChange={(e) => setAppCloseTrigerPass(e.target.value)} />
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