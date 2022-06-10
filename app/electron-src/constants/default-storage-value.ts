import { app } from 'electron'
const propertiesReader = require('properties-reader');
const log = require('electron-log');

// アプリディレクトリ取得
const exePath = app.getAppPath();
log.info('ini file path, ',exePath);
// iniファイル読み込み
const properties = propertiesReader(exePath + '/setup.ini');


const splitComma = (word: string) => {
    return word.split(',');
}

export const defaultLocalStorageValue = {
    "CSV_TMP_PASS" : properties.get('env.CSV_TMP_PASS'),
    "APP_CLOSE_TRIGER_PASS" : properties.get('env.APP_CLOSE_TRIGER_PASS'),
    "API_IP" : properties.get('env.API_IP'),
    "FILTER_SETTING" : splitComma(properties.get('application.FILTER_SETTING')),
    "SORT_SETTING" : {
        "display_number" : properties.get('application.SORT_SETTING_DISPLAY_NUMBER'),
        "max_distance" : properties.get('application.SORT_SETTING_MAX_DISTANCE'),
    },
    "AI_ENGINE" : properties.get('application.AI_ENGINE'),
    "ICON" : properties.get('application.ICON'),
    "THEME" : properties.get('application.THEME'),
    "EVALUATE_OPTION" : properties.get('application.EVALUATE_OPTION'),
}