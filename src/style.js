const getGendiff = (tree) => {
  const result = tree.map((node) => {
    const { status } = node;
    if (status === 'deleted') {
      return `  - ${node.key}: ${node.value}`;
    }
    if (status === 'added') {
      return `  + ${node.key}: ${node.value}`;
    }
    if (status === 'changed') {
      const del = `  - ${node.key}: ${node.value1}`;
      const add = `  + ${node.key}: ${node.value2}`;
      return `${del}\n${add}`;
    }
    return `    ${node.key}: ${node.value}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default getGendiff;
