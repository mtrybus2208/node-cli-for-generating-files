const fs = require('fs');
const path = require('path');
const validators = require('./validators');
const { colours } = require('./colours');  
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const formattedChoices = CHOICES.map((item, i) => i > 0 ? ` ${item}` : item);

const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: `${colours.cyan('Enter module template name from the list:')} => [${formattedChoices}]: `,
        validators: {
            fn: validators.template(CHOICES),
            msg: `${colours.red('Wrong input format, array of templates does not contain chosen template or input is not a string')}`,
        },
        format: 'string',
    },
    {
        name: 'module',
        type: 'input',
        message: `${colours.cyan('What is the name of module?(snake_case): ')}`,
        validators: {
            fn: validators.moduleValidator,
            msg: `${colours.red('Wrong input format, should be as snake_case')}`,
        },
    },
];

module.exports = {
    QUESTIONS
};
