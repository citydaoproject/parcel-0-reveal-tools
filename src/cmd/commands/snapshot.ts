import { fetchNFTOwners } from '../actions/snapshot';
import { program, ProgramSubCommand } from './cmd';

const snapshotCommand = program.command('snapshot').description('Commands to fetch data from the Ethereum network');

interface NFTOwnersParams {
  address: string;
  outputFile: string;
}

snapshotCommand
  .command('nft-owners')
  .description('Snapshot NFT owner data')
  .requiredOption('--address <address>', 'The NFT address')
  .requiredOption('--output-file <file>', 'The file to store the NFT owner addresses per ID')
  .action(({ address, outputFile }: NFTOwnersParams, cmd: ProgramSubCommand) => fetchNFTOwners(address, outputFile));
