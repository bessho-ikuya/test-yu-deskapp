const fs = require('fs');
const pfs = require('fs').promises;

async function fetchDirCsv(path: string) :Promise<string[]>
{
  const fileNameList: string[] = [];
  fs.readdirSync(path)
  .filter((fileName:string) => fs.statSync(`${path}/${fileName}`).isFile() && /.*\.csv$/.test(`${path}/${fileName}`))
  .forEach((fileName:string) => fileNameList.push(fileName));
  if (fileNameList.length <= 0) {
    throw new Error('failed to get csv file');
  }
  return fileNameList
}

async function readCsv(path: string)
{
    try {
      const content: any = await pfs.readFile(path, 'utf-8')
      return content;
    } catch (error) {
      throw new Error('failed to read csv');
    }
}

async function writeCsv(path: string, data: any)
{
    // TODO::csv生成
    fs.writeFile(path, data, function (err: any) {
        if (err) {
            throw err;
        }
    });
}

async function unlinkCsv(path: string)
{
    fs.unlink(path, function (err: any) {
        if (err) {
            throw err;
        }
    });
}

export {fetchDirCsv, readCsv, unlinkCsv, writeCsv}