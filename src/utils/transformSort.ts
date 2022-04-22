import { isString } from 'lodash';

export const transformSort = (paramSort) => {
  let sort = paramSort;

  if (isString(sort)) sort = sort.replace(/,/, ' ').split(' ');

  if (Array.isArray(sort)) {
    const sortObj = {};

    sort.forEach((s) => {
      if (s.startsWith('-')) {
        sortObj[s.slice(1)] = -1;
      } else {
        sortObj[s] = 1;
      }
    });

    return sortObj;
  }

  return sort;
};
