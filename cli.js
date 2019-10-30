'use strict';

const readline = require('readline');
const { generateFiles } = require('./generateFiles');
const { colours } = require('./colours');
const { QUESTIONS } = require('./config');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveAsyncReadLine = (item, successHandler) => {
    rl.question(item.message, answer => {
        if(!item.validators.fn(answer)) {
            console.log(item.validators.msg);
            return recursiveAsyncReadLine(item, successHandler);
        }
        successHandler({
            name: item.name,
            value: answer,
        });
    });
};

const askQuestions = () => 
    new Promise((res, rej) => {

        let chainQ = Promise.resolve([]);

        QUESTIONS.forEach((item) => {
            chainQ = chainQ.then( answers => new Promise((resQ) => {
                recursiveAsyncReadLine(item, answer => {
                    answers.push(answer);
                    resQ(answers);
                })
            }));
        });

        chainQ.then((answers) => {
            console.log(`${colours.green('Module created!')}`)
            rl.close();
            res(answers);
        })
    });

askQuestions()
    .then(config => {
        generateFiles(config);
    })
    .catch(err => {
        console.log(`ERROR: ${err}`);
    });