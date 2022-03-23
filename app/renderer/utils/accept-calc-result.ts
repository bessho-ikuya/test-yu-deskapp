async function acceptFirstCalcResult(setError, endLoading, setErrorMessage) {
    global.ipcRenderer.addListener('ExecCalcResult', (_event, args) => {
        if (!args.status) {
            setError()
        }
        if (args.message !== '') {
            setErrorMessage(args.message)
        }
        endLoading()
    })
}

export default acceptFirstCalcResult