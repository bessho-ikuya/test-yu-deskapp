// import connection from './connection';
import mock from '../mock';

async function ExportCsv(csvData: any) {
    // const res:any = await connection().post('win', csvData);
    const res:any = await mock(csvData, false);
    return res;
}

export default ExportCsv