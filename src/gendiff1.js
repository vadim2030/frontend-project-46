import path from 'path';
import { readFileSync } from 'node:fs';
import findDiff from './findDiff.js';
import newExtension from './parse.js';
import getFormat from './formatters/index.js';

const getContent = (route) => readFileSync(route, 'utf8');
const getPath = (route) => path.resolve(process.cwd(), route);

const gendiff = (path1, path2, nameFormat = 'stylish') => {
  const extname1 = path.extname(path1).slice(1);
  const extname2 = path.extname(path2).slice(1);
  const newRoute1 = getPath(path1);
  const newRoute2 = getPath(path2);
  const data1 = newExtension(getContent(newRoute1), extname1);
  const data2 = newExtension(getContent(newRoute2), extname2);
  return getFormat(findDiff(data1, data2), nameFormat);
};

export default gendiff;
