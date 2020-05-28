const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");
require('dotenv').config();

const questions = [
    {
        type: 'input',
        name: 'username',
        message: "Username: ",
        validate: function(name){
            return name !== '';
        }
    }, 
    {
        type: 'input',
        name: 'repo',
        message: "Repo: ",
        validate: function(name){
            return name !== '';
        }
    },    
    {
        type: 'input',
        name: 'title',
        message: "Title: ",
        validate: function(name){
            return name !== '';
        }
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
        name: 'badges',
        message: 'Badges: '
    },
    {
        type: 'input',
        name: 'contributors',
        message: "Contributors (Github Usernames): "
    },
    // yes/no q
    {
        type: 'list',
        name: 'table',
        message: "Table of Contents? ",
        choices: ['Yes', 'No']
    },
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

async function askQuestions(questions){
    inquirer.prompt(questions).then(async (answers) => {
        // JSON.stringify(answers, null, '  ')
        let marked = await generateMarkdown(answers);
        console.log(marked)
        writeToFile('README-yo', marked);
    });
}

function init() {
    askQuestions(questions);
}

init();
