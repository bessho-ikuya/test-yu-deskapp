async function mock(requestData: any, error: boolean) {
    // 5秒待つ
    await new Promise(resolve => setTimeout(resolve, 5000))
    console.log('request__', requestData)
    if (error) {
        throw new Error('error');
    }
    const res = {
        data: {
            result: [
                {
                    receipt_code : "傷病傷病傷病傷病傷病傷病傷病傷病傷病傷病傷",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
                {
                    receipt_code : "傷病aa",
                    distance : '0.123',
                    user : ['string'],
                    recept1 : 'string',
                    recept2 : 'string'
                },
            ]
        }
    };
    return res;
}

export default mock