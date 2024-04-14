import Api from '../src';

test('test constants import', () => {
    const result = Api.ApiJSON.get("OK");
    expect(result).toBe(Api.ApiJSON.get("OK"));
});