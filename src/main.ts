import {getMarkdownOrTextFilePathList, loadFile, saveJson} from "./depnode.ts"
import { getMetaData } from "./getMetaData.ts";

const files = getMarkdownOrTextFilePathList();
var data: any[] = [];
files.map(v => {
  const text = loadFile(v);
  getMetaData(text).map(m => {
    return {
      path: v,
      // md5: md5(text),
      meta: m
    }
  }).forEach(v => data.push(v));
  
})

saveJson("./data.json", data);
console.log("const data =", JSON.stringify(data, null, "  "));

