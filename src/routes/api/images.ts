import express, { NextFunction, Request, Response } from 'express';
import { isExistImage, resizeImage } from '../../modules/convertImage';

const images = express.Router();

//First Middleware - Check query parameters
images.use('/', (req: Request, res: Response, next: NextFunction): void | Promise<Response> => {
    const { filename, width, height } = req.query;
    //Check query parameters if exists
    if (!filename || !width || !height) {
        res.status(404).send(`Query parameters [filename, width, height] must be filled. Try again`);
    }
    if (isNaN(width as unknown as number) || isNaN(height as unknown as number)) {
        res.status(404).send(`Query parameters [width, height] must be numbers. Try again`);
    } else {
        next();
    }
});

//Second Middleware - Check if it already exists image
images.use('/', async (req: Request, res: Response, next: NextFunction): Promise<void | string> => {
    const { filename, width, height, format } = req.query;
    const isExistedImage = await isExistImage(
        filename as string,
        parseInt(width as string),
        parseInt(height as string),
        format as string,
    );
    if (isExistedImage !== false) {
        console.log('Retrieve existed image');
        res.sendFile(isExistedImage as string);
    } else {
        next();
    }
});

//Main Endpoint
images.get('/', async (req: Request, res: Response): Promise<string | void> => {
    const { filename, width, height, format } = req.query;
    try {
        res.sendFile(
            await resizeImage(
                filename as string,
                parseInt(width as string),
                parseInt(height as string),
                format as string,
            ),
        );
    } catch {
        res.status(404).send(
            'This image is not exist in file directory, avaiable images: [encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica]',
        );
    }
});

export default images;
