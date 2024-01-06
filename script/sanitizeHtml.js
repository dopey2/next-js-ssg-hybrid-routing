const pretify = require('html-prettify');
const fs = require("fs");

const htmlFilePath = process.argv[2];
console.log("htmlFilePath", htmlFilePath);

const htmlFileStr = fs.readFileSync(htmlFilePath, "utf-8");
const html = pretify(htmlFileStr);
fs.writeFileSync(htmlFilePath, html, "utf-8");


