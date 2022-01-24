import sharp from 'sharp';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { constants } from 'fs';

// Create Folder to save edited images
const createFolder = async (dir: string): Promise<void> => {
    fsPromises.access(path.resolve(dir), constants.F_OK).catch(() => {
        fsPromises.mkdir(path.resolve(dir));
    });
};

// Check if already exist image
const isExistImage = async (
    file: string,
    width: number,
    height: number,
    toFormat = 'jpg',
    destination = 'static/images/edited/',
): Promise<boolean | string> => {
    createFolder(destination);
    const pathFile = path.resolve(`${destination}/${file}-${width}-${height}.${toFormat}`);
    try {
        await fsPromises.access(pathFile, fs.constants.R_OK).catch(() => {
            throw false;
        });
        return pathFile;
    } catch {
        return false;
    }
};

// Resize Image
const resizeImage = async (
    file: string,
    width: number,
    height: number,
    toFormat = 'jpg',
    destination = 'static/images/edited/',
): Promise<string> => {
    try {
        createFolder(destination);
        await sharp(path.resolve(`static/images/${file}.jpg`))
            .resize({ width: width, height: height })
            .toFile(path.resolve(`${destination}${file}-${width}-${height}.${toFormat}`));
    } catch (error) {
        throw Error;
    }
    return path.resolve(`${destination}${file}-${width}-${height}.${toFormat}`);
};

export { resizeImage, isExistImage };
