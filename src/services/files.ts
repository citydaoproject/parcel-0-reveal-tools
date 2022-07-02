import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const writeDataToFile = async (data: any, outputFile: string) => {
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, JSON.stringify(data));
};
