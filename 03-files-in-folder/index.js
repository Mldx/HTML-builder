const {readdir} = require('fs/promises');
const {stat} = require('fs/promises');

const path = require('node:path');
const currPath = path.join(__dirname, 'secret-folder');

readdir(currPath, {withFileTypes: true})
  .then(value => (value
    .filter(val => val.isFile())
    .map(value => value.name))
    .forEach(value => {
      stat(`${currPath}\\${value}`)
        .then(val => {

          const extname = (path.extname(`${currPath}\\${value}`).replace('.', ''));
          const name = value.slice(0, value.indexOf('.'));
          const weight = val.size / 1000;

          console.log(`${name} — ${extname} — ${weight}kb`);
        });
    }));
