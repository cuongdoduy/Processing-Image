import { promises as fs } from 'fs';
import path from 'path';
import resizeImage from '../service/ImageProcessing';

interface ImageQuery {
  filename: string;
  width: string;
  height: string;
}

export const checkIfFileExists = async (fileName: string): Promise<boolean> => {
  try {
    const inputFileName = path.resolve(
      __dirname,
      '..',
      '..',
      'assets',
      'images',
      fileName.concat('.jpg')
    );
    await fs.access(inputFileName);
    return true;
  } catch (error) {
    return false;
  }
};

export const createThumbnailsFolder = async (): Promise<void> => {
  try {
    const thumbnailsFolder = path.resolve(
      __dirname,
      '..',
      '..',
      'assets',
      'thumbnails'
    );
    await fs.mkdir(thumbnailsFolder);
  } catch (error) {
    return;
  }
};

export const checkIfThumbnailExists = async (
  fileName: string,
  width: string,
  height: string
): Promise<boolean> => {
  try {
    const thumbnailFileName = `${fileName}-${width}x${height}.jpg`;
    const thumbnailPath = path.resolve(
      __dirname,
      '..',
      '..',
      'assets',
      'thumbnails',
      thumbnailFileName
    );
    await fs.access(thumbnailPath);
    return true;
  } catch (error) {
    return false;
  }
};

export const createImage = async (
  query: ImageQuery
): Promise<null | string> => {
  try {
    const { filename, width, height } = query;
    const inputFileName = path.resolve(
      __dirname,
      '..',
      '..',
      'assets',
      'images',
      filename.concat('.jpg')
    );
    const outputFileName = path.resolve(
      __dirname,
      '..',
      '..',
      'assets',
      'thumbnails',
      `${filename}-${width}x${height}.jpg`
    );
      const error = await resizeImage({
        inputFileName,
        outputFileName,
        width: parseInt(width),
        height: parseInt(height)
      });
      return error;
  } catch (error) {
    return 'Something went wrong. Please try again later.';
  }
};
