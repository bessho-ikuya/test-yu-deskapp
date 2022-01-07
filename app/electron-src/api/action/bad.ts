import connection from '../connection';

async function bad(request: any) {
    const res:any = await connection().post('bad', request);
    return res;
}

export default bad