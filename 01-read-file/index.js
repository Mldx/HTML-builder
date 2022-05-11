const fs = require('node:fs');
const path = require('node:path');

const currPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(currPath);

stream.on('data', (chunk) => console.log(`${chunk}`));
