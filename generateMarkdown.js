const shields = require('shields')();
const axios = require('axios');

async function loadUser(user){
  return await axios.get(`https://api.github.com/users/${user}`, {
    headers: { 'Authorization': `token ${process.env.token}`}
  })
  .then((response) => response.data )
  .catch((error) => error )
}

function createTable(data){
  let stringed = data.map((item, index) => `${index + 1}. [${item}](#${item})`).join('\n');
  return stringed;
}

async function generateMarkdown(data) {
  let {title, description, installation, usage, table, tests, badges, contributors, picture, email, username} = data;
  let user = await loadUser(username);
  console.log(typeof contributors)
  let keys = Object.keys(data);
  let include = keys.filter((key) => {
    // REMOVE UNDESIRABLE ITEMS
    if(key != 'table' && key != 'badges' && key != 'title' && data[key] != 'No'){
      // RETURN IF TRUTHY
      return data[key]
    }
  });

  if(picture == 'Yes'){
    data.picture = `![](${user.avatar_url})`;
  }
  if(email == 'Yes'){
    data.email = `[${user.email}]('mailto:${user.email}')`;
  }

  let contents = include.map((content) => `## ${content}\n${data[content]}`).join('\n');
  let toc = table ? createTable(include) : '';

  // let thing = shields('travis', {
  //   repo: 'KenanY/shields'
  // });
  // [![${badges}](${thing.image})](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

  return `
# ${title}
${description ? description : ''}
---
${ toc }
${ contents }
`;
}

module.exports = generateMarkdown;

// ## Table of Contents
// ${ contents }
// ## Installation
// ${installation}
// ## Usage
// ${usage}
// ## Tests
// ${tests}
// ## Contributors
// ${contributors}
// ## Picture
// ${picture }
// ## Email
// ${email}
// # Welcome to Spazcool's [Portfolio Page](http://www.spazcool.com/)

// This is where I am hosting the best work I've done thus far in my coding journey. Always a work in progress, expect changes.

// <p align="center">
//    <img width="70%" height="300vh" src="/imgs/projects/portfolio/desktop.gif">
//    <img width="20%" height="300vh" src="/imgs/projects/portfolio/mobile.gif">
// </p>

// ## Getting Started

// Just hop on over to the site [site](http://www.spazcool.com/nasa-quiz) & take a gander.

// ### Prerequisites

// A browser and an internet connection is all you'll need.

// ### Installing

// No installation required.

// ## Built With

// * JS, jQuery & WebGL
// * HTML
// * CSS, SASS & Material Design Lite

// ## Authors

// * **Douglas Wright** - [Spazcool](https://github.com/Spazcool)

// ## License

// This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

// ## Acknowledgments

// * [Covid API](https://covid-api.com)
// * [Data Arts](https://github.com/dataarts/webgl-globe)
// * [Chrome Experiments](http://www.chromeexperiments.com/globe)
// * [freeCodeCamp](https://www.freecodecamp.com/)