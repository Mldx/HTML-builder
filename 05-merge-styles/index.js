const fs = require('node:fs');
const path = require('node:path');

const stylePath = path.join(__dirname, 'styles');
const outPath = path.join(__dirname, 'project-dist');

fs.readdir(stylePath, (err, files) => {
  const cssFilesList = files.filter(value => value.slice(value.lastIndexOf('.')) === '.css');
  let strOut = '';
  cssFilesList.forEach(val => {
    fs.readFile(path.join(stylePath, val), 'utf-8', (err, data) => {
      strOut += data;
      fs.writeFile(path.join(outPath, 'bundle.css'), strOut, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
});
