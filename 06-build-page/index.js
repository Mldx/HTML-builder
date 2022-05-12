const fs = require('node:fs');
const path = require('node:path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const outPath = path.join(__dirname, 'project-dist');

const stylePath = path.join(__dirname, 'styles');
const outPathCss = path.join(__dirname, 'project-dist');

const currPathImg = path.join(path.join(__dirname, 'assets', 'img'));
const outPathImg = path.join(__dirname, 'project-dist', 'assets', 'img');

const currPathFonts = path.join(path.join(__dirname, 'assets', 'fonts'));
const outPathFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');

const currPathSvg = path.join(path.join(__dirname, 'assets', 'svg'));
const outPathSvg = path.join(__dirname, 'project-dist', 'assets', 'svg');


fs.mkdir(outPath, () => {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), () => {
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), () => {
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), () => {
    });
  });
});

fs.readFile(templatePath, 'utf-8', (err, data) => {
  let template = data;
  fs.readdir(componentsPath, (err, files) => {
    files.forEach((val, i) => {
      fs.readFile(path.join(componentsPath, val), 'utf-8', (err, data) => {
        template = template.replace(`{{${val.slice(0, val.lastIndexOf('.'))}}}`, data);
        if (i === files.length - 1) {
          setTimeout(()=>fs.writeFile(path.join(outPath, 'template.html'), template, () => {
          }),100);
        }
      });
    });
  });
});

fs.readdir(stylePath, (err, files) => {
  const cssFilesList = files.filter(value => value.slice(value.lastIndexOf('.')) === '.css');
  let strOut = '';
  cssFilesList.forEach(val => {
    fs.readFile(path.join(stylePath, val), 'utf-8', (err, data) => {
      strOut += data;
      fs.writeFile(path.join(outPathCss, 'style.css'), strOut, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
});

copyFile(currPathImg, outPathImg);
copyFile(currPathFonts, outPathFonts);
copyFile(currPathSvg, outPathSvg);

function copyFile(currPath, outPath) {
  fs.readdir(outPath, (err, files) => {
    if (files) {
      files.forEach(value => {
        fs.unlink(path.join(outPath, value), () => {
        });
      });
    }
  });

  fs.readdir(currPath, (err, files) => {
    files.forEach(value => {
      fs.readFile(path.join(currPath, value), (err, data) => {
        if (err) {
          throw err;
        }
        fs.mkdir(outPath, {recursive: true}, () => {
          fs.writeFile(path.join(outPath, value), data, (err) => {
            if (err) {
              throw err;
            }
          });
        });
      });
    });
  });
}


