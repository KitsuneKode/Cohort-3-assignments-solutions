// 3. fs.read
// import fs from 'fs';

const fs = require('fs');

let promisified_fs = (file_address, encoding) => {
    let p = new Promise((resolve, reject)=>
    fs.readFile(file_address, encoding, (err, data)=> {
        if(err){
            reject(err);
        }
        else{
            resolve(data);
        }
    }))

    return p;
}

let printData = (data) => {
        console.log(data);
} 


promisified_fs("abc.txt","utf-8")
    .then((data)=> printData(data))
    .catch((error) => {console.error(error.message)});
