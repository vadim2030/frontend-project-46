import _ from 'lodash';

const getStringify = (content) => {
  if (_.isObject(content)) {
    return '[complex value]';
  }
  return _.isString(content) ? `'${content}'` : String(content);
};

const plain = (data, way = []) => {
  const result = data.reduce((acc, obj) => {
    const path = [...way, obj.key];
    switch (obj.type) {
      case 'added':
        return [...acc, `Property '${path.join('.')}' was added with value: ${getStringify(
          obj.value,
        )}`];
      case 'nested':
        return [...acc, plain(obj.children, path)];
      case 'deleted':
        return [...acc, `Property '${path.join('.')}' was removed`];
      case 'changed':
        return [...acc, `Property '${path.join('.')}' was updated. From ${getStringify(obj.value1)} to ${getStringify(obj.value2)}`];
      case 'unchanged':
        return acc;
      default:
        return [];
    }
  }, []);

  return result.join('\n');
};

export default plain;
