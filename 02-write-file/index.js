const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const {stdin, stdout} = require('node:process');
const currPath = path.join(__dirname, 'text.txt');

const stream = fs.createWriteStream(currPath);
const rl = readline.createInterface({input: stdin, output: stdout});

rl.on('SIGINT', () => {
  console.clear();
  console.log('Файл записан!');
  rl.close();
});

console.log('Напишите что нибудь в консоль:');
rl.on('line', (line) => {
  if (line === 'exit' || line === 'Exit') {
    console.clear();
    console.log('Файл создан!');
    rl.close();
  } else {
    stream.write(`${line}\n`);
  }
});

