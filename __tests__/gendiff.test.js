import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff1.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff for json', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.stylish.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.json', '__fixtures__/filepath2.json')).toEqual(result);
});

test('gendiff for yml', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.stylish.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toEqual(result);
});

test('gendiff for plain format', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.plain.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml', 'plain')).toEqual(result);
});

test('gendiff for json format', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.json.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml', 'json')).toEqual(result);
});
