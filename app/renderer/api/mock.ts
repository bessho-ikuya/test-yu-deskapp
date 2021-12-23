async function mock(csvData: any, error: boolean) {
    // 5秒待つ
    await new Promise(resolve => setTimeout(resolve, 5000))
    if (error) {
        throw new Error('error');
    }
    const res = {
        data: csvData
    };
    return res;
}

export default mock