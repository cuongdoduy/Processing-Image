import teachers from './api/teacher';
import students from './api/student';
import images from './api/image';
import express from 'express';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.send('API');
});
routes.use('/images', images);
routes.use('/teacher', teachers);
routes.use('/student', students);

export default routes;
