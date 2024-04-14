import ApiParser from '../src';

test('test constants import', () => {
    const result = ApiParser.default._CREATED;
    expect(result).toBe(ApiParser.default._CREATED);
});