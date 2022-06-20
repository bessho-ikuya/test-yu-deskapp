import { app } from 'electron'
const propertiesReader = require('properties-reader');
const path = require('path')

// アプリディレクトリ取得
let rootDir = app.getAppPath()
let last = path.basename(rootDir)
if (last == 'app.asar') {
    rootDir = path.dirname(app.getPath('exe'))
}

// iniファイル読み込み
const properties = propertiesReader(rootDir + '/setup.ini');

// コンマを配列に変換
const splitComma = (word: string) => {
    if (word == "") {
        return "[]";
    }
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