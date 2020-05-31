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
  let arr = [];
  let people = data.contributors.split(',');
  people.unshift(data.username);
  let cleaned = [...new Set(people)] // Set only allows unique values, cuts out duplicates
    .map((item) => item.replace(/\s/gi, '')) // Remove whitespce, Github doesn't allow
    .filter((item) => item.length > 0); // Remove blanks
 
  for (person of cleaned) {
    let user = await loadUser(person);
    arr.push(`<a href="${user.html_url}"><img src="${user.avatar_url}" title="${user.login}" width="10%"/></a>`);
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
//todo uppercase first letters
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
        arr.push(`## Table of Contents\n${createTable(keys)}`);
        break;
      case 'installation':
        arr.push(`## Installation\n${data.installation}`);
        break;
      case 'usage':
        arr.push(`## Usage\n${data.usage}`);
        break;
      case 'tests':
        arr.push(`## Tests\n${data.tests}`);
        break;
      case 'questions':
        arr.push(`## Got questions?\n${data.tests}`);
        break;
      case 'contributing':
        arr.push(`## Contributing\n${data.contributing}`);
        break;
      case 'contributors':
        arr.push(`## Contributors\n${await createUserLink(data)}`);
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