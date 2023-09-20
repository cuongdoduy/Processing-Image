import exress from 'express';
import {
  checkIfFileExists,
  checkIfThumbnailExists,
  createImage
} from '../../utils/File';
const images = exress.Router();

interface ImageQuery {
  filename: string;
  width: string;
  height: string;
}

const checkValidQuery = async ({
  filename,
  width,
  height
}: ImageQuery): Promise<null | string> => {
  if (!filename) return 'Filename is required';
  if (!width) return 'Width is required';
  if (!height) return 'Height is required';
  if (typeof filename !== 'string') return 'Filename must be a string';
  if ((await checkIfFileExists(filename)) === false)
    return 'Image not found. Please try again';
  const widthNumber = parseInt(width || '0');
  const heightNumber = parseInt(height || '0');
  if (Number.isNaN(widthNumber) || widthNumber < 1)
    return 'Please enter a valid width';
  if (Number.isNaN(heightNumber) || heightNumber < 1)
    return 'Please enter a valid height';
  return null;
};

images.get(
  '/',
  async (req: exress.Request, res: exress.Response): Promise<void> => {
    try {
      const { filename, width, height } = req.query as unknown as ImageQuery;
      const validateMessage: null | string = await checkValidQuery(
        req.query as unknown as ImageQuery
      );
      if (validateMessage !== null) {
        res.status(400).json({ error: validateMessage });
        return;
      }
      const thumbnailExists = await checkIfThumbnailExists(
        filename,
        width,
        height
      );
      if (thumbnailExists) {
        const thumbnailFileName = `${filename}-${width}x${height}.jpg`;
        res.sendFile(thumbnailFileName, {
          root: './assets/thumbnails'
        });
      } else {
        await createImage({
          filename,
          width,
          height
        });
        const thumbnailFileName = `${filename}-${width}x${height}.jpg`;
        res.sendFile(thumbnailFileName, {
          root: './assets/thumbnails'
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default images;
