import sharp from 'sharp';

interface ImageProcessing {
  inputFileName: string;
  outputFileName: string;
  width: number;
  height: number;
}

const resizeImage = async ({
  inputFileName,
  width,
  height,
  outputFileName
}: ImageProcessing): Promise<null | string> => {
  try {
    await sharp(inputFileName)
      .resize(width, height)
      .toFormat('jpg')
      .toFile(outputFileName);
    return null;
  } catch (error) {
    return 'Something went wrong. Please try again later.';
  }
};

export default resizeImage;
