import { builder } from '@builder.io/sdk'
import fs from 'fs'


builder.init("a990e2f6684a4892a18e785fc204107d");

// ----------------
function renderPage(builderData) {
  console.log('jsCode', builderData.data.jsCode) // Should we call this? How to do it properly? Via <script>${jsCode} it doesn't works.

  return  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${builderData.data.title}</title>
    <meta name="description" content="${builderData.data.description}">
    <meta name="theme-color" content="">
    <meta name="apple-mobile-web-app-status-bar-style" content="">

  </head>

  <body>
    ${builderData.data.html}
  </body>

</html>
  `;
}

async function generatePage() {
  try {

    await builder
      .get('page', {
        url: '/pulsz-landing-v-4-1-dev'
      })
      .promise()
      .then((data) => {
          console.log("Data:", data);
        fs.writeFileSync('./out/index.html', renderPage(data));
      });

  } catch (err) {
    console.error(err);
  }
}

// ------------------------------
// RUN
generatePage()


