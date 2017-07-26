
export function objectFromKeyValueArray (pairArray) {
  return pairArray.reduce((obj, pair) => {
    const key = pair[0];
    let value = pair[1];

    // Remove leading/trailing single quotes
    if (value[0] === '\'') value = value.slice(1);
    if (value[value.length - 1] === '\'') value = value.slice(0, value.length - 1);

    return Object.assign({}, obj, { [key]: value });
  }, {});
}
