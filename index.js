const fs = require('fs');
const path = require('path');
const readline = require('readline');

function findFileInDir(startPath, filter){
    if (!fs.existsSync(startPath)){
        console.log("Directory not found: ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    for(let i=0;i<files.length;i++){
        let filename = path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            findFileInDir(filename, filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
        };
    };
};
let filter = process.argv[2];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the filename fragment to search for: ', (filter) => {
    console.log('Starting from dir /mnt/g/mega, searching for '+filter);
    findFileInDir('/mnt/g/mega', filter);
    rl.close();
});