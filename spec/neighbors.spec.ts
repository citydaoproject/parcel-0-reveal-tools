import { buildPlotNeighborsGraph } from '../src/services/plot/neighbors';
import { Plot } from '../src/services/plot/plot';
import { createPlotFromPoints } from './helpers/plots';

describe('buildPlotNeighborsGraph', () => {
  it('should create neighbors for box edges', () => {
    const plot1 = createPlotFromPoints([
      [1, 3],
      [2, 3],
      [2, 4],
      [1, 4],
      [1, 3],
    ]);
    const plot2 = createPlotFromPoints([
      [2, 3],
      [3, 3],
      [3, 4],
      [2, 4],
      [2, 3],
    ]);
    const plot3 = createPlotFromPoints([
      [3, 3],
      [4, 3],
      [4, 4],
      [3, 4],
      [3, 3],
    ]);
    const plot4 = createPlotFromPoints([
      [1, 2],
      [2, 2],
      [2, 3],
      [1, 3],
      [1, 2],
    ]);
    const plot5 = createPlotFromPoints([
      [2, 2],
      [3, 2],
      [3, 3],
      [2, 3],
      [2, 2],
    ]);
    const plot6 = createPlotFromPoints([
      [3, 2],
      [4, 2],
      [4, 3],
      [3, 3],
      [3, 2],
    ]);
    const plot7 = createPlotFromPoints([
      [1, 1],
      [2, 1],
      [2, 2],
      [1, 2],
      [1, 1],
    ]);
    const plot8 = createPlotFromPoints([
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 2],
      [2, 1],
    ]);
    const plot9 = createPlotFromPoints([
      [3, 1],
      [4, 1],
      [4, 2],
      [3, 2],
      [3, 1],
    ]);

    // |---|---|---|
    // | 1 | 2 | 3 |
    // | 4 | 5 | 6 |
    // | 7 | 8 | 9 |
    // |---|---|---|

    const neighbors = buildPlotNeighborsGraph([plot1, plot2, plot3, plot4, plot5, plot6, plot7, plot8, plot9]);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot9);
  });

  it('should create neighbors for bigger box edges', () => {
    const plot1 = createPlotFromPoints([
      [1, 4],
      [2, 4],
      [2, 5],
      [3, 5],
      [3, 6],
      [1, 6],
      [1, 4],
    ]);
    const plot2 = createPlotFromPoints([
      [3, 5],
      [4, 5],
      [4, 6],
      [3, 6],
      [3, 5],
    ]);
    const plot3 = createPlotFromPoints([
      [5, 4],
      [6, 4],
      [6, 6],
      [4, 6],
      [4, 5],
      [5, 5],
      [5, 4],
    ]);
    const plot4 = createPlotFromPoints([
      [1, 3],
      [2, 3],
      [2, 4],
      [1, 4],
      [1, 3],
    ]);
    const plot5 = createPlotFromPoints([
      [2, 2],
      [5, 2],
      [5, 5],
      [2, 5],
      [2, 2],
    ]);
    const plot6 = createPlotFromPoints([
      [5, 3],
      [6, 3],
      [6, 4],
      [5, 4],
      [5, 3],
    ]);
    const plot7 = createPlotFromPoints([
      [1, 1],
      [3, 1],
      [3, 2],
      [2, 2],
      [2, 3],
      [1, 3],
      [1, 1],
    ]);
    const plot8 = createPlotFromPoints([
      [3, 1],
      [4, 1],
      [4, 2],
      [3, 2],
      [3, 1],
    ]);
    const plot9 = createPlotFromPoints([
      [4, 1],
      [6, 1],
      [6, 3],
      [5, 3],
      [5, 2],
      [4, 2],
      [4, 1],
    ]);

    // |----|---|----|
    // | 1  | 2 |  3 |
    // |   |-----|   |
    // |---|     |---|
    // | 4 |  5  | 6 |
    // |---|     |---|
    // |   |-----|   |
    // | 7  | 8 |  9 |
    // |----|---|----|

    const neighbors = buildPlotNeighborsGraph([plot1, plot2, plot3, plot4, plot5, plot6, plot7, plot8, plot9]);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot9);
  });

  it('should create neighbors for diagonal edges', () => {
    const plot1 = createPlotFromPoints([
      [3, 6],
      [4, 5],
      [5, 6],
      [4, 7],
      [3, 6],
    ]);
    const plot2 = createPlotFromPoints([
      [2, 5],
      [3, 4],
      [4, 5],
      [3, 6],
      [2, 5],
    ]);
    const plot3 = createPlotFromPoints([
      [4, 5],
      [5, 4],
      [6, 5],
      [5, 6],
      [4, 5],
    ]);
    const plot4 = createPlotFromPoints([
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [1, 4],
    ]);
    const plot5 = createPlotFromPoints([
      [3, 4],
      [4, 3],
      [5, 4],
      [4, 5],
      [3, 4],
    ]);
    const plot6 = createPlotFromPoints([
      [5, 4],
      [6, 3],
      [7, 4],
      [6, 5],
      [5, 4],
    ]);
    const plot7 = createPlotFromPoints([
      [2, 3],
      [3, 2],
      [4, 3],
      [3, 4],
      [2, 3],
    ]);
    const plot8 = createPlotFromPoints([
      [4, 3],
      [5, 2],
      [6, 3],
      [5, 4],
      [4, 3],
    ]);
    const plot9 = createPlotFromPoints([
      [3, 2],
      [4, 1],
      [5, 2],
      [4, 3],
      [3, 2],
    ]);

    //       ^
    //     / 1 \
    //   / 2 X 3 \
    // < 4 X 5 X 6 >
    //   \ 7 X 8 /
    //     \ 9 /
    //       v

    const neighbors = buildPlotNeighborsGraph([plot1, plot2, plot3, plot4, plot5, plot6, plot7, plot8, plot9]);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot5).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot6).neighbors).not.toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot7).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).not.toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot8).neighbors).toContain(plot9);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot4);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot5);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot6);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot7);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).toContain(plot8);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot9).neighbors).not.toContain(plot9);
  });

  it('should not create neighbors when boxes not next to each other (gap)', () => {
    const plot1 = createPlotFromPoints([
      [1, 3],
      [2, 3],
      [2, 4],
      [1, 4],
      [1, 3],
    ]);
    const plot2 = createPlotFromPoints([
      [3, 3],
      [4, 3],
      [4, 4],
      [3, 4],
      [3, 3],
    ]);
    const plot3 = createPlotFromPoints([
      [1, 1],
      [2, 1],
      [2, 2],
      [1, 2],
      [1, 1],
    ]);
    const plot4 = createPlotFromPoints([
      [3, 1],
      [4, 1],
      [4, 2],
      [3, 2],
      [3, 1],
    ]);

    // |---|---|---|
    // | 1 |   | 2 |
    // |   |   |   |
    // | 3 |   | 4 |
    // |---|---|---|

    const neighbors = buildPlotNeighborsGraph([plot1, plot2, plot3, plot4]);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot1).neighbors).not.toContain(plot4);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot2).neighbors).not.toContain(plot4);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot3).neighbors).not.toContain(plot4);

    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot1);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot2);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot3);
    expect<Set<Plot>>(neighbors.nodeFromPlot(plot4).neighbors).not.toContain(plot4);
  });
});
