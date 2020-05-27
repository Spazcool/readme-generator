const shields = require('shields')();

function generateMarkdown(data) {
  let {title, description, installation, usage, table, tests, badges, contributors, picture, email} = data; 
  let thing = shields('travis', {
    repo: 'KenanY/shields'
  });
  return `
# ${title}
[![${badges}](${thing.image})](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)


${description}
---
## Table of Contents
${table}
## Installation
${installation}
## Usage
${usage}
## Tests
${tests}
## Contributors
${contributors}
## Picture
${picture}
## Email
${email}
  `;
}

module.exports = generateMarkdown;


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