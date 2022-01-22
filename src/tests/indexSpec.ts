import { isExistImage, resizeImage } from '../modules/convertImage';
import fsPromiese from 'fs/promises';
import path from 'path';

//Variable to test images
const fileNames = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
const defaultPath = path.resolve(`static/images/edited/`);
const format = 'jpg';

const width = 100;
const height = 100;

const adder = 100;

const file = Math.floor(Math.random() * fileNames.length);

describe('Test endpoint images', () => {
    it('Create new image with specified parameter in folder', async () => {
        const response = await resizeImage(fileNames[file], width, height, format);
        expect(response).toBe(`${defaultPath}/${fileNames[file]}-${width}-${height}.${format}`);
    });

    it('Check if image already exist', async () => {
        const response = await isExistImage(fileNames[file], width + adder, height + adder);
        expect(response).toBe(false);
    });

    it('Retrieve existed image already created', async () => {
        await resizeImage(fileNames[file], width + adder, height + adder, format);
        const response = await isExistImage(fileNames[file], width + adder, height + adder);
        expect(response).toBe(`${defaultPath}/${fileNames[file]}-${width + adder}-${height + adder}.${format}`);
    });

    afterAll(async () => {
        await fsPromiese.rm(defaultPath, { recursive: true });
    });
});
