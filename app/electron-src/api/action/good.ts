import connection from '../connection';

async function good(request: any) {
    const res:any = await connection().post('good', request);
    return res;
}

export default good