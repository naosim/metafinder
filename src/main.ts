import jsYaml from "./js-yaml.mjs";
import {getMarkdownOrTextFilePathList, loadFile, saveJson} from "./depnode.ts"

function getMetaData(text: string): any {
  const rows = text.trim().split("\n").map(v => v.trim());
  if(rows[0].split(":").length != 2) {
    return {}
  } 
  const metaRawLines = []
  for(let i = 0; i < rows.length; i++) {
    if(rows[i].length == 0) {
      break;
    }
    metaRawLines.push(rows[i]);
  }
  return jsYaml.load(metaRawLines.join("\n"), undefined)
  // return JSON.parse(metaRawLines.join("\n"));

}

const files = getMarkdownOrTextFilePathList();

const data = files.map(v => {
  const text = loadFile(v);
  return {
    path: v,
    // md5: md5(text),
    meta: getMetaData(text)
  }
})

saveJson("./data.json", data);
console.log("const data =", JSON.stringify(data, null, "  "));

