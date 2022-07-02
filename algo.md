# Algorithms

## Dividing the Parcel into Plots

TODO: @mayur to update

### Inputs

### Outputs

### Requirements

### Algorithm

## Creating Images for Each Plot

TODO: @mayur to update

### Inputs

### Outputs

### Requirements

### Algorithm

## Assigning NFTs to Plots

### Inputs

1. JSON File of Plots in geojson format, identified with unique IDs
2. JSON File of NFTs and owner addresses

### Outputs

1. JSON File of NFT id to Plot ID

### Requirements

1. 1 Plot per NFT
2. Keep NFTs together for each owner address
3. Use a snapshot of NFT owners taken at a particular time

### Algorithm

#### Plot Preprocessing

1. Put all plots into a map hashed by plot ID
2. Add a marker to each plot to indicate whether it has been used
3. Put all plot edges into a map hashed by normalized edges. 
   For each edge of each plot:
   1. Determine the slope of the edge
   2. Normalize the size of the edge to a Euclidean distance of 1
   3. Normalize the location of the lowest point of the edge to Y origin (0)
   4. Store the normalized edge with the original edge
   5. Use the normalized edge as the key to the map
   6. Store a tuple of the plot and the original edge into a list as the value 
      of the map
4. Create a graph of plots and their neighbors.
   For each edge of each plot:
   1. Look up other plots with the same normalized edges.
      For each plot on the same line that is not already a neighbor:
      1. Determine if there are any edges in this plot that overlap the 
         original edge
      2. If so, create neighbor links from the original plot to this plot and 
         vice versa

#### Owner Address Preprocessing

1. Group NFTs by owner address
2. Order owner addresses by # of NFTs owned, descending (ie most owned first)
3. Order NFTs per owner address by NFT id, ascending (ie lowest first) 

#### Determine Plot for each NFT

Create a map to store Plot IDs (value) by NFT ID (key).

For each owner address in order defined above:
1. Pick the first NFT in the list, determined by the order above
2. Randomly choose a plot
3. If the chosen plot is not available, go to #2
4. The chosen plot is available, so:
   1. add the Plot ID to the map
   2. mark the Plot used
   3. add the Plot to the list of plots owned by the owner address
5. If there are more NFTs in the owner's list, pick the next NFT in the list
6. Pick the first plot that the owner owns
7. Randomly pick a neighboring plot using the graph created above
8. If the chosen plot is not available and there are more neighboring plots, 
   go to #7
9. If the chosen plot is not available and the owner owns more plots,
   pick the next plot that the owner owns and go to #7
10. If the chosen plot is not available, go to #2
11. The chosen plot is available, so go to #4
