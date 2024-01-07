// TODO find a plugin to prettify HTML

const pretify = (html) => html;
const fs = require("fs");

const htmlFilePath = process.argv[2];
console.log("htmlFilePath", htmlFilePath);

const htmlFileStr = fs.readFileSync(htmlFilePath, "utf-8");
const html = pretify(htmlFileStr);
fs.writeFileSync(htmlFilePath, html, "utf-8");


