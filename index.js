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
        type: 'list',
        name: 'table',
        message: "Table of Contents? ",
        choices: ['Yes', 'No']
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
        name: 'tests',
        message: 'Tests: '
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Contributing: "
    },
    {
        type: 'input',
        name: 'contributors',
        message: "Contributors (Github Usernames, comma separated): "
    },
    {
        type: 'input',
        name: 'license',
        message: 'License: '
    }
];

function writeToFile(dirName, data) {
    fs.mkdirSync(`${process.cwd()}/readmes/${dirName}`, {recursive: true}, (error) => {
        if(error){console.log(error)}
        else{
            fs.writeFileSync(`/readmes/${dirName}/README.md`, data);
        }
    });
}

async function askQuestions(questions){
    inquirer.prompt(questions).then(async (answers) => {
        let marked = await generateMarkdown(answers);
        writeToFile(`${answers.title}`, marked);
    });
}

function init() {
    askQuestions(questions);
}

init();
