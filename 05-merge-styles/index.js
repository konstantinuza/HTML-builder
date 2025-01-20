const { writeFile, readdir, readFile, appendFile } = require('node:fs/promises');
const path = require('path');

const from = path.join(__dirname, 'styles');
const to = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyle(from, to) {

  await writeFile(to, '', { flag: 'w' });

  const files = await readdir(from, { withFileTypes: true });

  for (let file of files) {
    if (file.isFile()) {
      const filePath = path.join(from, file.name);
      const fileExt = path.parse(filePath).ext;

      if (fileExt === '.css') {
        const text = await readFile(filePath, 'utf-8');
        await appendFile(to, text + '\n');
      }
    }
  }
}

mergeStyle(from, to);