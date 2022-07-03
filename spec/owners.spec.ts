import { groupNFTsWithOwners, NFTOwner, OwnerWithNFTs } from '../src/services/owners';

describe('groupNFTsWithOwners', () => {
  it('should sort the NFTs ID, ascending', () => {
    const nftOwners: NFTOwner[] = [
      { ownerAddress: 'A', nftId: '5' },
      { ownerAddress: 'B', nftId: '6' },
      { ownerAddress: 'B', nftId: '3' },
      { ownerAddress: 'B', nftId: '1' },
      { ownerAddress: 'A', nftId: '4' },
      { ownerAddress: 'A', nftId: '2' },
      { ownerAddress: 'C', nftId: '8' },
      { ownerAddress: 'C', nftId: '10' },
      { ownerAddress: 'B', nftId: '7' },
    ];

    const result = groupNFTsWithOwners(nftOwners);
    const ownerA = findOwnerNFTs(result, 'A');
    expect<string[]>(ownerA.nftIds).toEqual(['2', '4', '5']);

    const ownerB = findOwnerNFTs(result, 'B');
    expect<string[]>(ownerB.nftIds).toEqual(['1', '3', '6', '7']);

    const ownerC = findOwnerNFTs(result, 'C');
    expect<string[]>(ownerC.nftIds).toEqual(['8', '10']);
  });

  it('should sort the addresses by number of NFTs, descending', () => {
    const nftOwners: NFTOwner[] = [
      { ownerAddress: 'A', nftId: '5' },
      { ownerAddress: 'B', nftId: '6' },
      { ownerAddress: 'B', nftId: '3' },
      { ownerAddress: 'B', nftId: '1' },
      { ownerAddress: 'A', nftId: '4' },
      { ownerAddress: 'A', nftId: '2' },
      { ownerAddress: 'C', nftId: '8' },
      { ownerAddress: 'B', nftId: '7' },
    ];

    const result = groupNFTsWithOwners(nftOwners);
    expect<number>(result.length).toEqual(3);

    expect<string[]>(result.map(({ ownerAddress }) => ownerAddress)).toEqual(['B', 'A', 'C']);
  });
});

const findOwnerNFTs = (ownersWithNFTs: OwnerWithNFTs[], address: string): OwnerWithNFTs =>
  ownersWithNFTs.find(({ ownerAddress }) => ownerAddress === address)!;
