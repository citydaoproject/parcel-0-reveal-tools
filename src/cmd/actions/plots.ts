import { mkdirs, readDataFromFile, writeDataToFile } from '../../services/files';
import { NFTOwner } from '../../services/owners';
import {
  assignPlotsToNFTs,
  assignPlotsToNFTsFromFile,
  buildOwnerAssignmentsWithPlots,
} from '../../services/plot/assign';
import { convertPlotsFileToPlots, convertPlotsToPlotsFile, PlotsFile } from '../../services/plot/plot';
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
  unusedPlotsFile?: string;
  debugDir?: string;
}

export const assignPlotsToNFTsAction = async (
  nftsFile: string,
  plotsFile: string,
  outputFile: string,
  { unusedPlotsFile, debugDir }: AssignPlotsOptions = {},
) => {
  print(`Assigning plots from '${plotsFile}' to NFTs in '${nftsFile}' into '${outputFile}'...`);

  const nftOwners = await readDataFromFile<NFTOwner[]>(nftsFile);
  const plotsFileData = await readDataFromFile<PlotsFile>(plotsFile);
  const plots = convertPlotsFileToPlots(plotsFileData);

  const nftPlots = assignPlotsToNFTs(plots, nftOwners);
  await writeDataToFile(nftPlots, outputFile);

  if (unusedPlotsFile) {
    print(`Writing unused plots to '${unusedPlotsFile}'...`);
    const usedPlotIds = new Set<number>(nftPlots.map(({ plotId }) => plotId));
    const unusedPlots = plots.filter(({ id }) => !usedPlotIds.has(id));
    await writeDataToFile(convertPlotsToPlotsFile(unusedPlots), unusedPlotsFile);
  }

  if (debugDir) {
    print(`Writing debug data to '${debugDir}'...`);
    await mkdirs(debugDir);
    const ownerAssignments = buildOwnerAssignmentsWithPlots(plotsFileData, nftPlots);
    await Promise.all(
      ownerAssignments.map(({ ownerAddress, plots }) =>
        writeDataToFile(convertPlotsToPlotsFile(plots), `${debugDir}/${ownerAddress}.geojson`),
      ),
    );
  }

  print('Done.');
};
