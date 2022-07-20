import { assignPlotsToNFTsAction, augmentPlotsWithNFTs } from '../actions/plots';
import { program, ProgramSubCommand } from './cmd';

const plotsCommand = program.command('plots').description('Commands to work with plots');

interface AssignPlotsParams {
  plotsFile: string;
  nftsFile: string;
  outputFile: string;
  unusedPlotsFile?: string;
  debugDir?: string;
}

plotsCommand
  .command('assign')
  .description('Assign the given plots to NFTs')
  .requiredOption('--plots-file <file>', 'The geojson input file with plot details')
  .requiredOption('--nfts-file <num>', 'The file containing the NFTs to assign')
  .requiredOption('--output-file <file>', 'The file that will contain the assigned plots for all NFTs')
  .option('--unused-plots-file <file>', 'An optional file that will contain the geojson for all unused plots')
  .option('--debug-dir <directory>', 'An optional directory to output debug plot files per owner')
  .action(({ nftsFile, plotsFile, outputFile, unusedPlotsFile, debugDir }: AssignPlotsParams, cmd: ProgramSubCommand) =>
    assignPlotsToNFTsAction(nftsFile, plotsFile, outputFile, { unusedPlotsFile, debugDir }),
  );

interface AugmentPlotsWithNFTsParams {
  assignmentsFile: string;
  plotsFile: string;
  outputFile: string;
}

plotsCommand
  .command('augment-with-nfts')
  .description('Augment plots file with NFT IDs')
  .requiredOption('--assignments-file <num>', 'The file containing the NFTs assigned to the plots')
  .requiredOption('--plots-file <file>', 'The geojson input file with plot details')
  .requiredOption('--output-file <file>', 'The file that will contain the augmented plots with NFT IDs')
  .action(({ assignmentsFile, plotsFile, outputFile }: AugmentPlotsWithNFTsParams, cmd: ProgramSubCommand) =>
    augmentPlotsWithNFTs(assignmentsFile, plotsFile, outputFile),
  );
