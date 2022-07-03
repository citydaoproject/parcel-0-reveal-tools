import { PathLike } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

export const writeDataToFile = async (data: any, outputFile: string) => {
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, JSON.stringify(data));
};

export const readDataFromFile = async <T>(inputFile: PathLike): Promise<T> => {
  const resultJson = await readFile(inputFile);
  return JSON.parse(resultJson.toString());
};
