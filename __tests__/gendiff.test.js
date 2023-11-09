import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastfixtures = [
  [undefined, '__fixtures__/filepath1.json', '__fixtures__/filepath2.json', 'result.stylish.txt'],
  ['stylish', '__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml', 'result.stylish.txt'],
  ['plain', '__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml', 'result.plain.txt'],
  ['json', '__fixtures__/filepath1.yml', '__fixtures__/filepath2.yml', 'result.json.txt'],
];
describe('test gendiff', () => {
  test.each(pastfixtures)('Should work with nested structures %s', (format, path1, path2, expected) => {
    const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
    const result = readFileSync(getFixturePath(expected), 'utf-8');
    expect(gendiff(path1, path2, format)).toEqual(result);
  });
});
