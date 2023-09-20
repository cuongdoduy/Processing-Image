import express from 'express';
const students = express.Router();
students.get('/', (req: express.Request, res: express.Response) => {
    res.send('Student API');
}
);

export default students;