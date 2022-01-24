import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();
const port = 8080; // default port to listen

// Define a route handler for the default home page
app.get('/', (req: Request, res: Response): Response => {
    return res.send('In order to test project; visit /api');
});

// Define routes - Middleware
app.use('/api', routes);

// Start the Express server
app.listen(port, (): void => {
    console.log(`server started at http://localhost:${port}`);
});

export default app;
