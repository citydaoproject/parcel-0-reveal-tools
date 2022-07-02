import { print } from '../commands/cmd';

export interface CreatePlotsOptions {
  sizeTolerance: number;
}

export const createPlots = (
  numPlots: number,
  inputFile: string,
  outputFile: string,
  { sizeTolerance }: CreatePlotsOptions,
) => {
  print(`Creating ${numPlots} plots from '${inputFile}' into '${outputFile}' with tolerance of ${sizeTolerance}...`);

  // todo: create plots

  print('Done.');
};

export const createPlotImages = (plotsFile: string, imageFile: string, outputDir: string) => {
  print(`Creating images from plots in '${plotsFile}' and main image '${imageFile}' into files in '${outputDir}'...`);

  // todo: create images

  print('Done.');
};

export interface AssignPlotsOptions {
  nftStartIndex: number;
}

export const assignPlotsToNFTs = (
  numNFTs: number,
  inputFile: string,
  outputFile: string,
  { nftStartIndex }: AssignPlotsOptions,
) => {
  print(`Assigning plots from '${inputFile}' to ${numNFTs} NFTs into '${outputFile}', starting at ${nftStartIndex}...`);

  // todo: assign plots

  print('Done.');
};
