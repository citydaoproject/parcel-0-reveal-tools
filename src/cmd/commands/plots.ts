import { assignPlotsToNFTs, createPlotImages, createPlots } from '../actions/plots';
import { asInt, program, ProgramSubCommand } from './cmd';

const plotsCommand = program.command('plots').description('Commands to work with plots');

interface CreatePlotsParams {
  numPlots: number;
  inputFile: string;
  outputFile: string;
  tolerance: number;
}

plotsCommand
  .command('create-plots')
  .description('Create equally sized plots from the given geojson input file into the given file location')
  .requiredOption('--num-plots <num>', 'The number of plots to create', asInt)
  .requiredOption('--input-file <file>', 'The geojson input file with parcel details')
  .requiredOption('--output-file <file>', 'The file that will contain the geojson for all of the generated plots')
  .option(
    '--tolerance <amount>',
    'How much tolerance to allow for the difference in size of the plots',
    parseFloat,
    0.1,
  )
  .action(({ numPlots, inputFile, outputFile, tolerance }: CreatePlotsParams, cmd: ProgramSubCommand) =>
    createPlots(numPlots, inputFile, outputFile, { sizeTolerance: tolerance }),
  );

interface CreateImagesParams {
  plotsFile: string;
  imageFile: string;
  outputDir: string;
}

plotsCommand
  .command('create-images')
  .description('Create images for each of the plots')
  .requiredOption('--plots-file <file>', 'The geojson input file with parcel details')
  .requiredOption('--image-file <file>', 'The main image input file')
  .requiredOption('--output-dir <directory>', 'The directory that will contain the generated images for each plot')
  .action(({ plotsFile, imageFile, outputDir }: CreateImagesParams, cmd: ProgramSubCommand) =>
    createPlotImages(plotsFile, imageFile, outputDir),
  );

interface AssignPlotsParams {
  numNFTs: number;
  inputFile: string;
  outputFile: string;
  startAt: number;
}

plotsCommand
  .command('assign')
  .description('Assign the given plots to NFTs')
  .requiredOption('--num-nfts <num>', 'The number of NFTs to assign', asInt)
  .requiredOption('--input-file <file>', 'The geojson input file with plot details')
  .requiredOption('--output-file <file>', 'The file that will contain the geojson for all of the generated plots')
  .option('--start-at <nft-id>', 'The NFT ID to start at', asInt, 1)
  .action(({ numNFTs, inputFile, outputFile, startAt }: AssignPlotsParams, cmd: ProgramSubCommand) =>
    assignPlotsToNFTs(numNFTs, inputFile, outputFile, { nftStartIndex: startAt }),
  );
