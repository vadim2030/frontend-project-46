import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const getIndent2 = (depth) => replacer.repeat(depth * spacesCount - 4);

const renderValue = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `  ${getIndent(depth + 1)}${key}: ${renderValue(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (newTree, depth = 1) => {
    const result = newTree.map((node) => {
      const indent = getIndent(depth);
      const { status } = node;
      if (status === 'deleted') {
        return `${indent}- ${node.key}: ${renderValue(node.value, depth)}`;
      }
      if (status === 'added') {
        return `${indent}+ ${node.key}: ${renderValue(node.value, depth)}`;
      }
      if (status === 'nested') {
        return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
      }
      if (status === 'changed') {
        const del = `${indent}- ${node.key}: ${renderValue(node.value1, depth)}`;
        const add = `${indent}+ ${node.key}: ${renderValue(node.value2, depth)}`;
        return `${del}\n${add}`;
      }
      return `${indent}  ${node.key}: ${renderValue(node.value, depth)}`;
    });
    const indent = getIndent2(depth);
    return `{\n${result.join('\n')}\n${indent}}`;
  };
  return iter(tree);
};

export default stylish;
