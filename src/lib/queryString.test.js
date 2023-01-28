import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Cleyton',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Cleyton&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Cleyton',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Cleyton&abilities=JS,TDD');
  });

  it('should throw an error when as object is passed as value', () => {
    const obj = {
      name: 'Cleyton',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };
    expect(() => queryString(obj)).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Cleyton&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Cleyton',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Cleyton';

    expect(parse(qs)).toEqual({
      name: 'Cleyton',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Cleyton&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Cleyton',
      abilities: ['JS', 'TDD'],
    });
  });
});
