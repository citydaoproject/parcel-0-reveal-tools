import {
  convertPlotFeatureToPlot,
  createPlotEdgeFromPositions,
  createPlotEdgesFromMultiPolygon,
  edgesOverlap,
  normalizePlotEdgeSlope,
  PlotFeature,
} from '../src/services/plot/plot';

describe('convertPlotFeatureToPlot', () => {
  it('should', () => {
    const plot = convertPlotFeatureToPlot(testPlotFeature1);

    expect<number>(plot.id).toEqual(testPlotFeature1.properties.POLY_ID);
    expect<string>(plot.uuid).toEqual(testPlotFeature1.properties.UNIQUE_ID);
    expect<string>(plot.subdivision).toEqual(testPlotFeature1.properties.Name);

    expect<number>(plot.edges.length).toEqual(3);

    expect<number>(plot.edges[0].first.longitude).toEqual(-109.257901876581187);
    expect<number>(plot.edges[0].first.latitude).toEqual(44.923957964553026);
    expect<number>(plot.edges[0].second.longitude).toEqual(-109.257868959752116);
    expect<number>(plot.edges[0].second.latitude).toEqual(44.923957462238967);

    expect<number>(plot.edges[1].first.longitude).toEqual(-109.257868959752116);
    expect<number>(plot.edges[1].first.latitude).toEqual(44.923957462238967);
    expect<number>(plot.edges[1].second.longitude).toEqual(-109.257873205740808);
    expect<number>(plot.edges[1].second.latitude).toEqual(44.923816986397199);

    expect<number>(plot.edges[2].first.longitude).toEqual(-109.257873205740808);
    expect<number>(plot.edges[2].first.latitude).toEqual(44.923816986397199);
    expect<number>(plot.edges[2].second.longitude).toEqual(-109.257901876581187);
    expect<number>(plot.edges[2].second.latitude).toEqual(44.923957964553026);
  });
});

describe('createPlotEdgesFromMultiPolygon', () => {
  it('should create edges between the points', () => {
    const edges = createPlotEdgesFromMultiPolygon(testPlotFeature1.geometry);
    expect<number>(edges.length).toEqual(3);

    expect<number>(edges[0].first.longitude).toEqual(-109.257901876581187);
    expect<number>(edges[0].first.latitude).toEqual(44.923957964553026);
    expect<number>(edges[0].second.longitude).toEqual(-109.257868959752116);
    expect<number>(edges[0].second.latitude).toEqual(44.923957462238967);

    expect<number>(edges[1].first.longitude).toEqual(-109.257868959752116);
    expect<number>(edges[1].first.latitude).toEqual(44.923957462238967);
    expect<number>(edges[1].second.longitude).toEqual(-109.257873205740808);
    expect<number>(edges[1].second.latitude).toEqual(44.923816986397199);

    expect<number>(edges[2].first.longitude).toEqual(-109.257873205740808);
    expect<number>(edges[2].first.latitude).toEqual(44.923816986397199);
    expect<number>(edges[2].second.longitude).toEqual(-109.257901876581187);
    expect<number>(edges[2].second.latitude).toEqual(44.923957964553026);
  });
});

const testPlotFeature1: PlotFeature = {
  type: 'Feature',
  properties: {
    Name: 'Diamond Hill',
    POLY_ID: 0,
    UNIQUE_ID: '97597091-6ee0-4585-8fb3-38118c184df7',
    AREA: 101.1,
    POINTX: 2091490,
    POINTY: 16325333,
  },
  geometry: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [-109.257901876581187, 44.923957964553026],
          [-109.257868959752116, 44.923957462238967],
          [-109.257873205740808, 44.923816986397199],
          [-109.257901876581187, 44.923957964553026],
        ],
      ],
    ],
  },
};

describe('normalizePlotEdgeSlope', () => {
  it('should determine longitude shift based on height of 1', () => {
    expect<number>(
      normalizePlotEdgeSlope({ longitude: 0, latitude: 0 }, { longitude: 2, latitude: 1 }).longitudeShift,
    ).toEqual(2);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 2 }, { longitude: 3, latitude: 5 }).longitudeShift,
    ).toEqual(0.66);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 10, latitude: 20 }, { longitude: 30, latitude: 50 }).longitudeShift,
    ).toEqual(0.66);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 1 }, { longitude: 2, latitude: 1 }).longitudeShift,
    ).toEqual(Infinity);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 2, latitude: 1 }, { longitude: 1, latitude: 1 }).longitudeShift,
    ).toEqual(Infinity);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 1 }, { longitude: 1, latitude: 2 }).longitudeShift,
    ).toEqual(0);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 2 }, { longitude: 1, latitude: 1 }).longitudeShift,
    ).toEqual(0);
  });

  it('should determine latitude at the origin for longitude', () => {
    expect<number>(
      normalizePlotEdgeSlope({ longitude: 0, latitude: 0 }, { longitude: 2, latitude: 1 }).latitudeAtLongitudeOrigin,
    ).toEqual(0);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 0, latitude: 1 }, { longitude: 2, latitude: 5 }).latitudeAtLongitudeOrigin,
    ).toEqual(1);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 2, latitude: 3 }, { longitude: 4, latitude: 6 }).latitudeAtLongitudeOrigin,
    ).toEqual(0);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 10, latitude: 20 }, { longitude: 30, latitude: 50 })
        .latitudeAtLongitudeOrigin,
    ).toEqual(5);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 1 }, { longitude: 2, latitude: 1 }).latitudeAtLongitudeOrigin,
    ).toEqual(1);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 2, latitude: 1 }, { longitude: 1, latitude: 1 }).latitudeAtLongitudeOrigin,
    ).toEqual(1);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 1 }, { longitude: 1, latitude: 2 }).latitudeAtLongitudeOrigin,
    ).toEqual(-Infinity);

    expect<number>(
      normalizePlotEdgeSlope({ longitude: 1, latitude: 2 }, { longitude: 1, latitude: 1 }).latitudeAtLongitudeOrigin,
    ).toEqual(-Infinity);
  });
});

describe('edgesOverlap', () => {
  it('should overlap', () => {
    // horizontal
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [3, 1]), createPlotEdgeFromPositions([2, 1], [4, 1])),
    ).toBeTruthy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [3, 1]), createPlotEdgeFromPositions([2, 1], [3, 1])),
    ).toBeTruthy();

    // vertical
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [1, 3]), createPlotEdgeFromPositions([1, 2], [1, 4])),
    ).toBeTruthy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [1, 3]), createPlotEdgeFromPositions([1, 2], [1, 3])),
    ).toBeTruthy();

    // diagonal
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [3, 3]), createPlotEdgeFromPositions([2, 2], [4, 4])),
    ).toBeTruthy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [3, 3]), createPlotEdgeFromPositions([2, 2], [3, 3])),
    ).toBeTruthy();
  });

  it('should not overlap', () => {
    // horizontal
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 1]), createPlotEdgeFromPositions([3, 1], [4, 1])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 1]), createPlotEdgeFromPositions([2, 1], [3, 1])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 1]), createPlotEdgeFromPositions([1, 2], [2, 2])),
    ).toBeFalsy();

    // vertical
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [1, 2]), createPlotEdgeFromPositions([1, 3], [1, 4])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [1, 2]), createPlotEdgeFromPositions([1, 2], [1, 3])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [1, 2]), createPlotEdgeFromPositions([2, 1], [2, 2])),
    ).toBeFalsy();

    // diagonal
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 2]), createPlotEdgeFromPositions([3, 3], [4, 4])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 2]), createPlotEdgeFromPositions([2, 2], [3, 3])),
    ).toBeFalsy();

    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [3, 3]), createPlotEdgeFromPositions([3, 2], [5, 4])),
    ).toBeFalsy();

    // different slope
    expect<boolean>(
      edgesOverlap(createPlotEdgeFromPositions([1, 1], [2, 2]), createPlotEdgeFromPositions([1, 1], [2, 3])),
    ).toBeFalsy();
  });
});
