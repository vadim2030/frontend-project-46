import yaml from 'js-yaml';

const dataParsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
};
const dataParse = (data, format) => {
  const getData = dataParsers[format];
  if (getData) return getData(data);
  throw new Error(`I don't know how to deal with files with extension ${format}`);
};

export default dataParse;
