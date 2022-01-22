import express from 'express';
import { isExistImage, resizeImage } from '../../modules/convertImage';

const images = express.Router();

//First Middleware - Check query parameters
images.use('/', function (req, res, next) {
    const { filename, width, height } = req.query;
    //Check query parameters if exists
    if (!filename || !width || !height) {
        res.status(404).send(`Query parameters [filename, width, height] must be filled Try again`);
    } else {
        next();
    }
});

//Second Middleware - Check if it already exists image
images.use('/', async function (req, res, next) {
    const { filename, width, height, format } = req.query;
    const isExistedImage = await isExistImage(
        filename as string,
        parseInt(width as string),
        parseInt(height as string),
        format as string,
    );
    if (isExistedImage != false) {
        console.log('Retrieve existed image');
        res.sendFile(isExistedImage as string);
    } else {
        next();
    }
});

//Main Endpoint
images.get('/', async (req, res) => {
    const { filename, width, height, format } = req.query;
    res.sendFile(
        await resizeImage(filename as string, parseInt(width as string), parseInt(height as string), format as string),
    );
});

export default images;
