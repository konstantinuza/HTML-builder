const { stdin, exit } = process;
const fs = require('fs');

fs.writeFile('text.txt', '', (err) => {
  if (err) throw err;
});

console.log(`--- Yo, human! Enter text to write to file!\n--- When you're done, enter "exit" to end recording -->>`);

stdin.on('data', (data) => {
  const text = data.toString().trim();

  if (text === 'exit') exit();

  fs.appendFile('text.txt', text + '\n', (err) => {
    if (err) throw err;
  });
});

process.on('exit', function () {
  console.log(`--- File writing is complete, it's easy for me.`);
})







