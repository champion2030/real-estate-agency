import sharp from 'sharp';

export interface ImageSize {
  width?: number;
  height?: number;
}

export async function resizeImage(image: Buffer, size: ImageSize): Promise<Buffer> {
  return sharp(image).resize(size).toBuffer();
}
