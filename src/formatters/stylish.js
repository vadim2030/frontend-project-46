import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const bracketIndent = (depth) => replacer.repeat(depth * spacesCount - 4);

const getStringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `  ${getIndent(depth + 1)}${key}: ${getStringify(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (newTree, depth = 1) => {
    const result = newTree.map((node) => {
      const indent = getIndent(depth);
      const { type } = node;
      switch (type) {
        case 'deleted':
          return `${indent}- ${node.key}: ${getStringify(node.value, depth)}`;
        case 'added':
          return `${indent}+ ${node.key}: ${getStringify(node.value, depth)}`;
        case 'nested':
          return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'changed': {
          const del = `${indent}- ${node.key}: ${getStringify(node.value1, depth)}`;
          const add = `${indent}+ ${node.key}: ${getStringify(node.value2, depth)}`;
          return `${del}\n${add}`;
        }
        default:
          return `${indent}  ${node.key}: ${getStringify(node.value, depth)}`;
      }
    });
    const indent = bracketIndent(depth);
    return `{\n${result.join('\n')}\n${indent}}`;
  };
  return iter(tree);
};

export default stylish;
