import express, { Request, Response } from 'express';
import images from './api/images';

const routes = express.Router();

// Define a route main API
routes.get('/', (req: Request, res: Response): Response => {
    return res.send(
        'In order to use API visit /api/images?filename=encenadaport&width=200&height=200&format=png  as an example',
    );
});

//Middleware to use images
routes.use('/images', images);

export default routes;
