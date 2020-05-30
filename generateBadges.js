const fs = require("fs");
const { makeBadge, ValidationError } = require('badge-maker')

// for each file type, generate a badge, potentially with a percentage of rep of the directory
// console.log(arr)
// let arrTwo = arr.map((file) => {
//     console.log(file)
//     if(!fs.lstatSync(file).isFile()){
//         console.log("DOUG: ", file)
//         getFileTypes(`${process.cwd()}/${file}`)
//     }});
// console.log(arrTwo)
// TODO only grabbing from cwd, what about all folders from cwd
function getFileTypes(path){
    let arr = fs.readdirSync(path)
        .filter((file) => file.indexOf('.') !== 0 && file !== 'node_modules' && file.indexOf('.') !== -1)
        .sort((a, b) => a.slice(a.indexOf('.')).localeCompare(b.slice(b.indexOf('.'))))  //sort by file type
        .map((item) => item.slice(item.indexOf('.')));
    return arr;
}

function assignTypesToBadge(files){
    let arr = [];
    let obj = {};
    let total = files.length;

    files.forEach((file) => { obj[file] = (obj[file] || 0) + 1; });

    for(type in obj){
        let format = {
            label: `${type}`,
            message: `${Math.floor((obj[type]/total) * 100)}%  `,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        }
        arr.push(makeBadge(format))
    }

    return arr.join(" ");
}

let badges = assignTypesToBadge(getFileTypes(process.cwd()));

module.exports = () => {return badges};