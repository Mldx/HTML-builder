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

async function createDir() {
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
}

async function changeTemplate() {
  let template = await fs.promises.readFile(templatePath, 'utf-8');
  const componentNames = await fs.promises.readdir(componentsPath);
  for (const value of componentNames) {
    const component = await fs.promises.readFile(path.join(componentsPath, `${value}`), 'utf-8');
    const valRep = `{{${value.slice(0, value.lastIndexOf('.'))}}}`;
    template = template.replace(valRep, component);
  }
  fs.writeFile(path.join(outPath, 'template.html'), template, () => {
  });
}

async function cssJoin() {
  let bundle = '';
  let cssNames = await fs.promises.readdir(stylePath);
  cssNames = cssNames.filter(value => value.slice(value.lastIndexOf('.')) === '.css');
  for (const value of cssNames) {
    const cssFile = await fs.promises.readFile(path.join(stylePath, `${value}`), 'utf-8');
    bundle += cssFile;
  }
  fs.writeFile(path.join(outPathCss, 'style.css'), bundle, () => {
  });
}

async function copyFile(currPath, outPath) {
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

async function createSite() {
  await createDir();
  await changeTemplate();
  await cssJoin();
  await copyFile(currPathImg, outPathImg);
  await copyFile(currPathFonts, outPathFonts);
  await copyFile(currPathSvg, outPathSvg);
}

createSite();
