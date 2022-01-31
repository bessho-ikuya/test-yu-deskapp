import {iconList} from './icon-list'

const themeList = {
    "THEME1" : "#ECE9D8",
    "THEME2" : "#F1F3FF"
}

const themeDatas = [
    {
        value : "THEME1",
        label : "テーマ1",
    },
    {
        value : "THEME2",
        label : "テーマ2",
    }
]

const themeIcons = {
    "THEME1" : [
        {
            value : "001",
            label : iconList["001"],
        },
        {
            value : "002",
            label : iconList["002"],
        }
    ],
    "THEME2" : [
        {
            value : "002",
            label : iconList["002"],
        }
    ]
}

export {themeList, themeDatas, themeIcons}