import express from 'express';
import images from './api/images';

const routes = express.Router();

// Define a route main API
routes.get('/', (req, res) => {
    res.send(
        'In order to use API visit /api/images?filename=encenadaport&width=200&height=200&format=png  as an example',
    );
});

//Middleware to use images
routes.use('/images', images);

export default routes;
