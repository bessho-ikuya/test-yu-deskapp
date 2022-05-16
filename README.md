# yuyama-desctop-app

# 開発環境
1. ディレクトリのどこかに計算用csvファイルを設置(ex: /Users/ikuya/Documents/web_projects/yuyama)
2. package.json.scripts.devの--csvの後の値を上で設置したcsvのパスに変更  
 ```
 "dev": "npm run build-electron && electron . --csv /Users/ikuya/Documents/web_projects/yuyama --type record",
 ```
 3. 起動コマンド実行

 ```
 cd app
 npm run dev
 ```

# 本番用wondowsアプリ生成

1. package.jsonのversionとnameを変更
```
  "version": "0.1.1",
  "name": "0.1.1",
```

2. アプリ生成(windowsアプリの生成はmacではwineという別パッケージが必要なため、WindowsServerで行う)
```
cd app  
npm run dist -- -w  
```

3. app/distにinstallerが生成される

# アプリ 起動コマンド  
--type : “record” | “accounting“ | “receipt“  
--csv : csvディレクトリ  
```
start ~.exe --csv C:\...\ --type record
```