const isSnakeCase = (input) => {
    const snakeCaseRegex = /^([a-z]{1,})(_[a-z0-9]{1,})*$/;
    return snakeCaseRegex.test(input);
}

const isString = (val) => {
    return typeof val === 'string'|| ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}

const isTrueOrFalse = (val) => 
    isString(val) && (val === 'true' || val === 'false');

const snakeToCamel = (val) => val.replace(/_\w/g, (m) => m[1].toUpperCase());

const camelToKebab = (val) => {
    return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const capitalize = (s) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const snakeToPascal = val => snakeToCamel(capitalize(val));

module.exports = {
    isSnakeCase,
    isTrueOrFalse,
    isString,
    snakeToCamel,
    snakeToPascal,
    camelToKebab,
};
  