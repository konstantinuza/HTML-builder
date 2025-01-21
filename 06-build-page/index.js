const { rm, mkdir, writeFile, readdir, readFile, appendFile, copyFile } = require('node:fs/promises');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist')

async function buildPage() {
  await rm(projectPath, { recursive: true, force: true });
  await mkdir(projectPath, { recursive: true });

  const template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  await writeFile(path.join(projectPath, 'index.html'), template);

  await replaceHtml(path.join(__dirname, 'components'), path.join(projectPath, 'index.html'));
  await mergeStyle(path.join(__dirname, 'styles'), path.join(projectPath, 'style.css'));
  await copyDir(path.join(__dirname, 'assets'), path.join(projectPath, 'assets'));

  console.log('--- Page build is complete');
}

async function replaceHtml(from, to) {
  let mainFile = await readFile(to, 'utf-8');
  const files = await readdir(from, { withFileTypes: true });

  for (let file of files) {
    if (file.isFile()) {
      const filePath = path.join(from, file.name);
      const fileParse = path.parse(filePath);

      if (fileParse.ext === '.html') {
        const content = await readFile(filePath, 'utf-8');
        mainFile = mainFile.replaceAll(`{{${fileParse.name}}}`, content);
      }
    }
  }

  await writeFile(to, mainFile);
}

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


buildPage();