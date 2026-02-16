#!/usr/bin/env node
import sharp from "sharp";
import path from "path";
import fs from "fs";

const input = path.resolve(process.cwd(), "public", "og", "2 time dates.png");
const outputJpg = path.resolve(process.cwd(), "public", "og", "2-time-dates-og.jpg");
const width = 1200;
const height = 630;

if (!fs.existsSync(input)) {
  console.error(`Source image not found: ${input}`);
  process.exit(1);
}

console.log(`Reading ${input}`);
sharp(input)
  .resize(width, height, { fit: "cover", position: "centre" })
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: 90 })
  .toFile(outputJpg)
  .then(() => {
    console.log(`OG image written to ${outputJpg}`);
  })
  .catch((err) => {
    console.error("Error generating OG image:", err);
    process.exit(2);
  });
