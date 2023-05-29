const fetch = require("node-fetch");
const fs = require('fs');

function upload_image(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  fetch("https://builder.io/api/v1/upload", {
    method: "POST",
    body: bitmap,
    headers: {
     "Authorization": "Bearer bpk-1d0c237acd154a68ba4584720208fb54",
     "Content-Type": "image/jpeg"
    },
 }).then(res => {
      return res.json();
 }).then(resp => {
     console.log(resp);
 }).catch((e) => console.log(e));
}
upload_image('./image.jpg');

let url = 'https://images.pexels.com/photos/258196/pexels-photo-258196.jpeg?cs=srgb&dl=pexels-pixabay-258196.jpg&fm=jpg';

async function download() {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./image.jpg`, buffer, () => 
      console.log('finished downloading!'));
}


function upload_image(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    fetch("https://builder.io/api/v1/upload", {
      method: "POST",
      body: bitmap,
      headers: {
       "Authorization": "Bearer bpk-1d0c237acd154a68ba4584720208fb54",
       "Content-Type": "image/jpeg"
      },
   }).then(res => {
        return res.json();
   }).then(resp => {
       console.log(resp);
   }).catch((e) => console.log(e));
}
upload_image('./image.jpg');




