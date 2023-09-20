import express from 'express';
import routes from './routes/index';
import { createThumbnailsFolder } from './utils/File';
const app: express.Application = express();
const port: number = 3000; // Default port

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

// Use routes
app.use('/api', routes);

// Start server
app.listen(port, async (): Promise<void> => {
  // Create thumbnails folder if it doesn't exist
  await createThumbnailsFolder();
  console.log(`App listening on port ${port}`);
});
export default app;