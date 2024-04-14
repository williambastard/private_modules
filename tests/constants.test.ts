import Api from '../src';
import ApiInterface from '../src/api_parser/api_interface';

test('test constants import', () => {
    const result = Api.ApiDefaultResponse.get("OK");
    expect(result).toBe(Api.ApiDefaultResponse.get("OK"));
});