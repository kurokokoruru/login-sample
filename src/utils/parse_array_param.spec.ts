import { parseArrayParam } from './parse_array_param';

describe('array param', () => {
  it('should parse array param', () => {
    const arrayParam = parseArrayParam('1,2,3');
    expect(arrayParam).toEqual([1, 2, 3]);
  });

  it('should parse empty array param', () => {
    const arrayParam = parseArrayParam('');
    expect(arrayParam).toEqual([]);
  });

  it('should parse undefined array param', () => {
    const arrayParam = parseArrayParam(undefined);
    expect(arrayParam).toEqual([]);
  });

  it('should result is distinct', () => {
    const arrayParam = parseArrayParam('1,2,3,1');
    expect(arrayParam).toEqual([1, 2, 3]);
  });

  it('should to correct dash', () => {
    const arrayParam = parseArrayParam('1-3');
    expect(arrayParam).toEqual([1, 2, 3]);
  });

  it('should to correct complex dash', () => {
    const arrayParam = parseArrayParam('1-3,5-7');
    expect(arrayParam).toEqual([1, 2, 3, 5, 6, 7]);
  });

  it('should to correct complex dash2', () => {
    const arrayParam = parseArrayParam('1,5,1-3,5-7,9-11');
    expect(arrayParam).toEqual([1, 2, 3, 5, 6, 7, 9, 10, 11]);
  });
});
