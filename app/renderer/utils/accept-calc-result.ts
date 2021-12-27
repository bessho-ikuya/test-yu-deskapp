async function acceptFirstCalcResult(setError, endLoading) {
    global.ipcRenderer.addListener('ExecCalcResult', (_event, args) => {
        if (!args.status) {
            setError()
        }
        endLoading()
    })
}

export default acceptFirstCalcResult