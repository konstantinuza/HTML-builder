const { rm, mkdir, readdir, copyFile } = require('node:fs/promises');
const path = require('path');

async function copyDir(from, to) {
  await rm(to, { recursive: true, force: true });
  await mkdir(to, { recursive: true });
  const files = await readdir(from, { withFileTypes: true });

  for (let file of files) {
    const orgPath = path.join(from, file.name);
    const copyPath = path.join(to, file.name);
    if (file.isFile()) {
      await copyFile(orgPath, copyPath);
    } else {
      await copyDir(orgPath, copyPath);
    }
  }
}



copyDir('files', 'copy-files');