async function mock(requestData: any, error: boolean) {
    // 5秒待つ
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log('request__', requestData)
    if (error) {
        throw new Error('error');
    }
    const res = {
        data: [
            {
                id : 1,
                name : '変更テスト',
                weight : 'string',
                recept1 : 'string',
                recept2 : 'string'
            },
            {
                id : 2,
                name : 'string',
                weight : '変更テスト',
                recept1 : 'string',
                recept2 : 'string'
            }
        ]
    };
    return res;
}

export default mock