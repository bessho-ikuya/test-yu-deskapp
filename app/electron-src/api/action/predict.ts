import connection from '../connection';
// import mock from '../mock';

async function predict(request: any) {
    console.log('access')
    // const res:any = await mock(request, false);
    // return res;
    const res:any = await connection().post('predict', request);
    console.log(res.data)
    return res.data;
}

export default predict