const fs = require("fs");

function getFileTypes(path){
    let arr = fs.readdirSync(path)
        .filter((file) => file.indexOf('.') !== 0 && file !== 'node_modules' && file.indexOf('.') !== -1)
        .sort((a, b) => a.slice(a.indexOf('.')).localeCompare(b.slice(b.indexOf('.'))))  //sort by file type
        .map((item) => item.slice(item.indexOf('.'))); //return just the bits after the . (e.g. .js, .md, etc...)
    
    // TODO only grabbing from cwd, from all folders?
    // let arrTwo = arr.map((file) => {
    //     console.log(file)
    //     if(!fs.lstatSync(file).isFile()){
    //         console.log("DOUG: ", file)
    //         getFileTypes(`${process.cwd()}/${file}`)
    //     }});
    return arr;
}

// for each file type, generate a badge, with a percentage of rep of the directory
function assignTypesToBadge(files){
    let arr = [];
    let obj = {};
    let total = files.length;

    files.forEach((file) => { obj[file] = (obj[file] || 0) + 1; });

    for(type in obj){
        let color = Math.floor(Math.random()*16777215).toString(16);
        let percent = Math.floor((obj[type]/total) * 100);
        let format = `[![Generic badge](https://img.shields.io/badge/${type}-${percent}%25%0D%0A-${color}.svg)](https://shields.io/)`;
        arr.push(format)
    }

    return arr.join(" ");
}

let badges = assignTypesToBadge(getFileTypes(process.cwd()));

module.exports = () => {return badges};