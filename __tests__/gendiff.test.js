import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff1.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff for json', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.json', '__fixtures__/filepath2.json')).toEqual(result);
});

test('gendiff for yml', () => {
  const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const result = readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(gendiff('__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml')).toEqual(result);
});
