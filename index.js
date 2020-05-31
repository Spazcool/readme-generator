const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown.js");
require('dotenv').config();

const questions = [
    {
        type: 'input',
        name: 'username',
        message: "GitHub Username: ",
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
    {
        type: 'editor',
        name: 'description',
        message: "Description: "
    },
    {
        type: 'list',
        name: 'table',
        message: "Table of Contents? ",
        choices: ['Yes', 'No']
    },
    {
        type: 'editor',
        name: 'installation',
        message: "Installation: "
    },
    {
        type: 'editor',
        name: 'usage',
        message: "Usage: "
    },
    {
        type: 'editor',
        name: 'tests',
        message: 'Tests: '
    },
    {
        type: 'editor',
        name: 'questions',
        message: 'Questions? Who to contact?: '
    },
    {
        type: 'editor',
        name: 'contributing',
        message: "Contributing. How can others help?: "
    },
    {
        type: 'input',
        name: 'contributors',
        message: "Contributors (Github Usernames, comma separated): "
    },
    {
        type: 'editor',
        name: 'license',
        message: 'License: '
    }
];

function writeToFile(dirName, data) {
    fs.mkdirSync(`${process.cwd()}/readmes/${dirName}`, {recursive: true}, (error) => {
        if(error){console.log(error)}
    });
    fs.writeFileSync(`${process.cwd()}/readmes/${dirName}/README.md`, data);
    console.log(`\nREADME is complete.\nIt is located: ${process.cwd()}/readmes/${dirName}/README.md`);
}

async function askQuestions(questions){
    inquirer.prompt(questions).then(async (answers) => {
        let marked = await generateMarkdown(answers);
        writeToFile(`${answers.repo}`, marked);
    });
}

function init() {
    askQuestions(questions);
}

init();
