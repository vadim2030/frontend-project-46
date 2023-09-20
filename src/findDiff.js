import _ from 'lodash';

const findDiff = (path1, path2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(path1), ...Object.keys(path2)]));

  const newObj = keys.map((key) => {
    const data1 = path1[key];
    const data2 = path2[key];

    if (!_.has(path1, key)) {
      return { key, status: 'added', value: data2 };
    }
    if (!_.has(path2, key)) {
      return { key, status: 'deleted', value: data1 };
    }
    if (_.isPlainObject(data1) && _.isPlainObject(data2)) {
      return { key, status: 'nested', children: findDiff(data1, data2) };
    }

    if (!_.isEqual(data1, data2)) {
      return {
        key,
        status: 'changed',
        value1: data1,
        value2: data2,
      };
    }
    return { key, status: 'unchanged', value: data1 };
  });

  return newObj;
};

export default findDiff;
