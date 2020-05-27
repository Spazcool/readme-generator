const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");

const questions = [
    // takes a few words to 
    {
        type: 'input',
        name: 'title',
        message: "Title: "
    },
    // todo test out type: 'editor' which should open the editor of choice
    {
        type: 'input',
        name: 'description',
        message: "Description: "
    },
    {
        type: 'input',
        name: 'installation',
        message: "Installation: "
    },
    {
        type: 'input',
        name: 'usage',
        message: "Usage: "
    },
    {
        type: 'input',
        name: 'license',
        message: 'License: '
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Tests: '
    },
    // will need to take multiple separate inputs
    {
        type: 'input',
        name: 'table',
        message: "Table of Contents: "
    },
    {
        type: 'input',
        name: 'badges',
        message: 'Badges: '
    },
    {
        type: 'input',
        name: 'contributors',
        message: "Contributor: "
    },
    // yes/no q
    {
        type: 'list',
        name: 'picture',
        message: 'Include Profile Picture? ',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'email',
        message: 'Include Profile email? ',
        choices: ['Yes', 'No']
    }
];

function writeToFile(fileName, data) {
    fs.writeFileSync(`${fileName}.md`, data);
}

function askQuestions(questions){
    inquirer.prompt(questions).then(answers => {
        // JSON.stringify(answers, null, '  ')
        let marked = generateMarkdown(answers);
        console.log(marked)
        writeToFile('README-yo', marked);
    });
}

function init() {
    askQuestions(questions);
}

init();
