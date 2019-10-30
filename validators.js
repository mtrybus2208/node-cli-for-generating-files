const { isString, isSnakeCase } = require('./utils');

const template = (arr) => (item) => isString(item) && arr.indexOf(item) > -1;

const moduleValidator = (item) => isSnakeCase(item);
  
module.exports = {
    template,
    moduleValidator,
};
    