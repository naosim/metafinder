import jsYaml from "./js-yaml.mjs";

/**
 * 文字列からメタデータを取得する
 * 抽出条件
 * - 開始行...yaml 空行
 * - meta[改行] ...yaml... 空行
 * @param text 
 * @returns 
 */
export function getMetaData(text: string): any[] {
  // 各行のをトリム
  const formated = text.trim().split("\n").map(v => v.trim()).join("\n");
  // 空行区切り
  const sections = formated.split("\n\n").map(v => v.trim())
  
  return sections.filter((v, i) => {
    if(i == 0) {
      return true;
    }
    const firstLine = v.split("\n")[0];
    return firstLine.slice(-4) == "meta";
  })
  .map(v => {
    const rows = v.split("\n");
    if(rows[0].slice(-4) == "meta") {
      v = rows.slice(1).join("\n")
    }

    try {
      const result = jsYaml.load(v, undefined);
      return typeof result == "object" ? result : null;
    } catch(e) {
      return null
    }
  }).filter(v => v != null);
}
