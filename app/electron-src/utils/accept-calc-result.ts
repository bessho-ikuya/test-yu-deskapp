async function acceptFirstCalcResult(setError:any, endLoading:any) {
    global.ipcRenderer.addListener('ExecCalcResult', (_event, args) => {
        if (!args.status) {
            setError()
        }
        endLoading()
    })
}

export default acceptFirstCalcResult