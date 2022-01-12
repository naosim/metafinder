// node.js依存のコード

declare function require(modulename: string): any;
const { execSync } = require('child_process');
const fs = require('fs');
const cryptoLib = require('crypto');

export function md5(str: string): string {
  const md5 = cryptoLib.createHash('md5')
  return md5.update(str, 'binary').digest('hex');
}

export function getMarkdownOrTextFilePathList(): string[] {
  const commandResult: string = execSync('find .').toString();
  const list = commandResult.split("\n")
  .filter(v => v.indexOf("/.") == -1)
  .filter(v => v.slice(-3) == ".md" || v.slice(-4) == ".txt");
  return list;
}

export function loadFile(path: string): string {
  return fs.readFileSync(path, 'utf8');
}
export function loadJson(path: string): any {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

export function saveJson(path: string, obj: any) {
  fs.writeFileSync(path, JSON.stringify(obj));
}