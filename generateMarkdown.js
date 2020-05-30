const axios = require('axios');
const badges = require('./generateBadges.js');

async function loadUser(user){
  return await axios.get(`https://api.github.com/users/${user}`, {
    headers: { 'Authorization': `token ${process.env.token}`}
  })
  .then((response) => response.data )
  .catch((error) => error )
}

async function createUserLink(data){
  // TODO remove duplicates, if somone puts their name in twice
  let people = data.contributors.split(',');
  people.unshift(data.username);

  let arr = [];
 
  for (person of people) {
    let user = await loadUser(person.trim());
    arr.push(`<a href="${user.html_url}"><img src="${user.avatar_url}" title="${user.login}" style="border-radius: 50%; width: 3em;"/></a>`);
  }
  return arr.join(' ');
}

function createTable(keys){
  let stringed = keys.filter(item => { 
    if(
      item != 'username' && 
      item != 'repo' && 
      item != 'table'
    ){
      return item;
    }})
  .map((item, index) => `${index + 1}. [${item}](#${item})`).join('\n');
  return stringed;
}

function includeIt(data){
  let keys = Object.keys(data).filter((key) => data[key]);
  return keys;
}

async function formatContent(keys, data){
  let arr = [];

  for (key of keys) {
    switch(key){
      case 'title':
        arr.push(`# ${data.title}\n${badges()}\n---`);
        break;
      case 'description':
        arr.push(data.description);
        break;
      case 'table':
        arr.push(`## Table of Contents\n---\n${createTable(keys)}`);
        break;
      case 'installation':
        arr.push(`## Installation\n---\n${data.installation}`);
        break;
      case 'usage':
        arr.push(`## Usage\n---\n${data.usage}`);
        break;
      case 'tests':
        arr.push(`## Tests\n---\n${data.tests}`);
        break;
      case 'questions':
        arr.push(`## Got questions?\n---\n${data.tests}`);
        break;
      case 'contributing':
        arr.push(`## Contributing\n---\n${data.contributing}`);
        break;
      case 'contributors':
        arr.push(`## Contributors\n---\n${await createUserLink(data)}`);
        break;
      default:
        break;
    }
  };

  return arr.join('\n');
}

async function generateMarkdown(data) {
  let include = includeIt(data);
  let contents = await formatContent(include, data);

  return contents;
}

module.exports = generateMarkdown;