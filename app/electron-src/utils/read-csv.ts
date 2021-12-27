const fs = require('fs').promises;

async function readCsv(path: string)
{
    try {
      const content: any = await fs.readFile(path, 'utf-8')
      return content;
    } catch (error) {
      console.log(error)
      throw new Error('failed to read csv');
    }
}

export {readCsv}