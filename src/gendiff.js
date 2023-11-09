import path from 'path';
import { readFileSync } from 'node:fs';
import findDiff from './findDiff.js';
import dataParse from './parse.js';
import getFormat from './formatters/index.js';

const getContent = (route) => readFileSync(route, 'utf8');
const getPath = (route) => path.resolve(process.cwd(), route);

const extname = (filePath) => path.extname(filePath).slice(1);

const gendiff = (path1, path2, format = 'stylish') => {
  const newRoute1 = getPath(path1);
  const newRoute2 = getPath(path2);
  const data1 = dataParse(getContent(newRoute1), extname(path1));
  const data2 = dataParse(getContent(newRoute2), extname(path2));
  return getFormat(findDiff(data1, data2), format);
};

export default gendiff;
