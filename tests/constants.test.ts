import * as Api from '../src';

test('test constants import', () => {
    const result = Api.messages.use("OK");
    expect(result).toBe(Api.messages.use("OK"));
});