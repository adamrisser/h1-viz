import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const dir = path.join(process.cwd(), "taxonomy");

  //const fileContents = await fs.readFile(dir + "/taxonomy-no-L3.json", "utf8");
  const fileContents = await fs.readFile(
    dir + "/taxonomy-limited.json",
    "utf8"
  );
  //const fileContents = await fs.readFile(dir + "/taxonomy.json", "utf8");

  const json = JSON.parse(fileContents);

  res.status(200).json(json);
}
