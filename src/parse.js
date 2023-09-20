import yaml from 'js-yaml';

const newExtension = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default: throw new Error(`I don't know how to deal with files with extension ${format}`);
  }
};

export default newExtension;
