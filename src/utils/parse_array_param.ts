export const parseArrayParam = (arg: string): number[] => {
  if (!arg) {
    return [];
  }
  let result = arg.split(',');
  if (result.length === 1 && result[0] === '') {
    result = [];
  }

  // parse dash
  const dashParsed = result.map((item) => {
    if (item.indexOf('-') !== -1) {
      const [start, end] = item.split('-');
      const startNum = parseInt(start, 10);
      const endNum = parseInt(end, 10);
      const result: Array<number> = [];
      for (let i = startNum; i <= endNum; i++) {
        result.push(i);
      }
      return result;
    }
    return parseInt(item, 10);
  });

  const numArray = [].concat(...dashParsed);

  // distinct
  const uniqueArray = numArray.filter((item, index) => {
    return numArray.indexOf(item) === index;
  });

  return uniqueArray.sort((a, b) => {
    return a - b;
  });
};
