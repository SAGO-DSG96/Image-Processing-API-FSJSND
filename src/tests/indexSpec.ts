import { isExistImage, resizeImage } from '../modules/convertImage';
import app from '../index';
import fsPromiese from 'fs/promises';
import path from 'path';
import supertest from 'supertest';

describe('Test endpoints Image Proccessing API', () => {
    const defaultPath = path.resolve(`static/images/edited/`);

    describe('GET STATUS Endpoints', () => {
        //To test endpints
        const request = supertest(app);
        it('/api/images?filename=encenadaport MISSING width - height query parameters', async () => {
            const response = await request.get('/api/image?sfilename=encenadaport');
            expect(response.status).toBe(404);
        });
        it('/api/images?filename=encenadaport&width=s200&height=200s BAD - height or width query parameters', async () => {
            const response = await request.get('/api/images?filename=encenadaport&width=s200&height=200s');
            expect(response.status).toBe(404);
        });
        it('/api/images?filename=encenadaport&width=10&height=10', async () => {
            const response = await request.get('/api/images?filename=encenadaport&width=10&height=10');
            expect(response.status).toBe(200);
        });
    });

    describe('Test endpoint images', () => {
        //Variable to test images
        const fileNames = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
        const format = 'jpg';

        const width = 100;
        const height = 100;

        const adder = 100;

        const file = Math.floor(Math.random() * fileNames.length);
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
    });
    afterAll(async () => {
        await fsPromiese.rm(defaultPath, { recursive: true });
    });
});
