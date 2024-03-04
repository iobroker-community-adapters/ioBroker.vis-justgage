// update version in justgage.html and justgage.js

const fs = require('node:fs');
const pack = require('./package.json');

const html = fs.readFileSync(`${__dirname}/widgets/justgage.html`, 'utf8');
const newHtml = html.replace(/version: "\d+\.\d+\.\d+"/, `version: "${pack.version}"`);
if (html !== newHtml) {
    fs.writeFileSync(`${__dirname}/widgets/justgage.html`, newHtml);
    console.log('justgage.html updated');
}

const js = fs.readFileSync(`${__dirname}/widgets/justgage/js/justgage.js`, 'utf8');
const newJs = js
    .replace(/version: "\d+\.\d+\.\d+"/, `version: "${pack.version}"`)
    .replace(/version: '\d+\.\d+\.\d+',/, `version: '${pack.version}',`);
if (js !== newJs) {
    fs.writeFileSync(`${__dirname}/widgets/justgage/js/justgage.js`, newJs);
    console.log('justgage.js updated');
}
