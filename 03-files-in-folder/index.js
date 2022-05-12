const fs = require('fs');
const path = require('node:path');
const currPath = path.join(__dirname, 'secret-folder');

const func = (pat) => {
  fs.readdir(pat, {withFileTypes: true}, (error, files) => {
    files.forEach(value => {
      if (value.isFile()) {
        const filePath = path.join(pat, value.name);
        const fileName = value.name[0] !== '.'
          ? value.name.slice(0, value.name.indexOf('.'))
          : value.name;

        const fileExt = path.extname(filePath).replace('.', '')
          ? path.extname(filePath).replace('.', '')
          : 'file has no extension';

        let fileWeight;
        fs.stat(filePath, (error, stat) => {
          fileWeight = stat.size / 1000;
          console.log(`${fileName}—${fileExt}—${fileWeight}kB`);
        });
      }
    });
  });
};

func(currPath);
