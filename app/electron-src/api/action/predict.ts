import connection from '../connection';
// import mock from '../mock';

async function predict(request: any) {
    const res:any = await connection().post('predict', request);
    console.log(res)
    return res;
}

export default predict