const fs = require('node:fs');
const path = require('node:path');

const currPath = path.join(__dirname, 'files');
const currPathCopy = path.join(__dirname, 'files-copy');
console.log(currPathCopy);

fs.readdir(currPathCopy, (err, files) => {
  if (files) {
    files.forEach(value => {
      fs.unlink(path.join(currPathCopy, value), () => {
      });
    });
  }
});

fs.readdir(currPath, (err, files) => {
  files.forEach(value => {
    fs.readFile(path.join(currPath, value), 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      fs.mkdir(currPathCopy, {recursive:true}, () => {
        fs.writeFile(path.join(currPathCopy, value), data, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    });
  });
});
