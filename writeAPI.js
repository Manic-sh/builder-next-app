var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer bpk-80313a1e409e45d5ae30456556573640");

var raw = JSON.stringify({
  "ownerId": "c782aff3c66f48acb425981b997feb10",
  "@version": 3,
  "name": "test-out-json",
  "modelId": "f546a1c3030946009bef3e0433ce3901",
  "published": "draft",
  "query": [
    {
      "@type": "@builder.io/core:Query",
      "property": "urlPath",
      "operator": "is",
      "value": "/test-out-json"
    }
  ],
  "data": {
    "someProperty": "hello"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://builder.io/api/v1/write/page", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));