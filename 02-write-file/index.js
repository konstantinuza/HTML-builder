const { stdin, exit } = process;
const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt');

fs.writeFile(pathFile, '', (err) => {
  if (err) throw err;
});

console.log(`--- Yo, human! Enter text to write to file!\n--- When you're done, enter "exit" or press (ctrl + c) to end recording -->>`);

stdin.on('data', (data) => {
  const text = data.toString().trim();

  if (text === 'exit') exit();

  fs.appendFile(pathFile, text + '\n', (err) => {
    if (err) throw err;
  });
});

process.on('exit', function () {
  console.log(`--- File writing is complete, it's easy for me.`);
})

process.on('SIGINT', () => {
  exit();
});




