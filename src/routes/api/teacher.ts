import express from 'express';
const teachers = express.Router();
teachers.get('/', (req: express.Request, res: express.Response) => {
    res.send('Teacher API');
}
);

export default teachers;