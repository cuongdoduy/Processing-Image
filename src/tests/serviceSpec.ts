import resizeImage from '../service/ImageProcessing';
import { promises as fs } from 'fs';
import path from 'path';


describe('Test Image Processing Service', (): void => {
  const inputFileName = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'images',
    'palmtunnel.jpg'
  );
  const outputFileName = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'thumbnails',
    'palmtunnel-400x200.jpg'
  );
  it('Should create a thumbnail', async (): Promise<void> => {
    const error: null | string = await resizeImage({
      inputFileName,
      outputFileName,
      width: 400,
      height: 200
    });
    expect(error).toBeNull();
  });
  it('Should return error because of invalid input file', async (): Promise<void> => {
    const error: null | string = await resizeImage({
      inputFileName: 'invalid.jpg',
      outputFileName,
      width: 400,
      height: 200
    });
    expect(error).not.toBeNull();
  });
});

afterAll(async () => {
  const thumbnailPath = path.resolve(
    __dirname,
    '..',
    '..',
    'assets',
    'thumbnails',
    'palmtunnel-400x200.jpg'
  );
  try {
    await fs.access(thumbnailPath);
    fs.unlink(thumbnailPath);
  } catch (error) {
    console.log(error);
  }
});
