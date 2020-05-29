const axios = require('axios');

async function loadUser(user){
  return await axios.get(`https://api.github.com/users/${user}`, {
    headers: { 'Authorization': `token ${process.env.token}`}
  })
  .then((response) => {
    // console.log(response)
    return response.data })
  .catch((error) => error )
}

async function createUserLink(data){
  // todo add initual username to this list as well
  // remove duplicates, if somone puts their name in twice
  let people = data.contributors.split(',');
  let arr = [];
 
  for (person of people) {
    let user = await loadUser(person.trim());
    // ${user.email}
    // arr.push(`[![${user.email}](${user.avatar_url})(${user.html_url})]`);
    arr.push(`<a href=${user.html_url}><img src=${user.avatar_url} style="border-radius: 50%; width: 3em;"/></a>`);

  }
  return arr.join(' ');
}

function createTable(keys){
  let stringed = keys.filter(item => { 
    if(
      item != 'username' && 
      item != 'repo' && 
      item != 'badges' && 
      item != 'picture' && 
      item != 'email' && 
      item != 'table'){
      return item;
    }})
  .map((item, index) => `${index + 1}. [${item}](#${item})`).join('\n');
  return stringed;
}

function includeIt(data){
  let keys = Object.keys(data).filter((key) => data[key]);
  return keys;
}

// todo remove the async
async function formatContent(keys, data){
  let arr = [];
  // keys.forEach( async (key) => {
  for (key of keys) {

    switch(key){
      case 'title': 
        arr.push(`# ${data.title}`);
        break;
      case 'badges':
        arr.push(`[![Generic badge](https://img.shields.io/badge/<SUBJECT>-<STATUS>-<COLOR>.svg)](https://shields.io/)`);
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
      case 'contributors':
        let contributors = await createUserLink(data);
        console.log('fuck', contributors)
        arr.push(`## Contributors\n${contributors}`);
        break;
      default:
        break;
    }
  };
  console.log(arr)
  return arr.join('\n---\n');
}

async function generateMarkdown(data) {
  let include = includeIt(data);
  let contents = await formatContent(include, data);

  return contents;
}

module.exports = generateMarkdown;