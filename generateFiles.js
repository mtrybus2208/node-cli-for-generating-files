const fs = require('fs');
const path = require('path');
const { colours } = require('./colours');  
const CURR_DIR =  process.cwd();
const { snakeToCamel, snakeToPascal, camelToKebab } = require('./utils');

const replaceData = (data, content) => {
    return content
        .replace(/\[DATA\]/gm, data)
        .replace(/\[CAMEL_DATA\]/gm, snakeToCamel(data))
        .replace(/\[PASCAL_DATA\]/gm, snakeToPascal(data))
        .replace(/\[KEBAB_DATA\]/gm, camelToKebab(snakeToCamel(data)))
}

const createDirectoryContents = (templatePath, projectName) => {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            const replacedContent = replaceData(projectName, fs.readFileSync(origFilePath , 'utf8'));
            const replacedPath = `${CURR_DIR}/modules/${projectName}/${snakeToCamel(replaceData(projectName, file))}`;
            fs.writeFileSync(replacedPath, replacedContent, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(CURR_DIR, projectName, file));
            createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
        }
    });
}

const createProject = (projectPath) => {
    if (fs.existsSync(projectPath)) {
        console.log(colours.red(`Folder ${projectPath} exists. Delete or use another name.`));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}

const findObjByName = (arr, prop) =>
    arr.find(x => x.name === prop);
  
const generateFiles = config => {
    const moduleName = findObjByName(config, 'module').value;
    const templateName = findObjByName(config, 'template').value;
    const templatePath = path.join(__dirname, 'templates', templateName)
    const tartgetPath = path.join(CURR_DIR, 'modules', moduleName);

    if (!createProject(tartgetPath)) { return; }
    createDirectoryContents(templatePath, moduleName);
};

module.exports = {
    generateFiles
};
