import dfe from '../src';
import { test } from '@jest/globals';
const SECONDS = 1000;
jest.setTimeout(120 * SECONDS)

test('test if video if download', async () => {
    await new dfe('test.mp4').downloadFile('https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4')
});