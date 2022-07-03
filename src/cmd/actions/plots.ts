import { readDataFromFile, writeDataToFile } from '../../services/files';
import { NFTOwner } from '../../services/owners';
import { assignPlotsToNFTsFromFile } from '../../services/plot/assign';
import { PlotsFile } from '../../services/plot/plot';
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

export const assignPlotsToNFTs = async (nftsFile: string, plotsFile: string, outputFile: string) => {
  print(`Assigning plots from '${plotsFile}' to NFTs in '${nftsFile}' into '${outputFile}'...`);

  const nftOwners = await readDataFromFile<NFTOwner[]>(nftsFile);
  const plotsFileData = await readDataFromFile<PlotsFile>(plotsFile);

  const nftPlots = assignPlotsToNFTsFromFile(plotsFileData, nftOwners);
  await writeDataToFile(nftPlots, outputFile);

  print('Done.');
};
