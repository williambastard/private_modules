import * as Api from '../src';

test('test parser import', () => {
    const result = new Api.parser("");
    console.log("test:" + result._response);
    expect(result._response).toBe("");
});