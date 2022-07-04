import { Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Position } from 'geojson';

export type PlotsFile = FeatureCollection<PlotGeometry, PlotProperties>;
export type PlotFeature = Feature<PlotGeometry, PlotProperties>;
export type PlotGeometry = MultiPolygon;
export type PlotProperties = GeoJsonProperties & {
  Name: string;
  POLY_ID: number;
  UNIQUE_ID: string;
  AREA: number;
  POINTX: number;
  POINTY: number;
};

export interface Plot {
  id: number;
  uuid: string;
  subdivision: string;
  edges: PlotEdge[];
}

export interface PlotWithFeature extends Plot {
  feature: Feature<PlotGeometry, PlotProperties>;
}

export interface PlotPoint {
  longitude: number;
  latitude: number;
}

export interface PlotEdge {
  first: PlotPoint;
  second: PlotPoint;

  normalized: NormalizedPlotEdgeData;
}

export interface NormalizedPlotEdgeData {
  /** how far does the longitude shift east or west for a latitude of 1 */
  longitudeShift: number;

  /** where does the latitude meet the longitude 0 */
  latitudeAtLongitudeOrigin: number;
}

export const convertPlotsFileToPlots = (plotsFile: PlotsFile): PlotWithFeature[] =>
  plotsFile.features.map(convertPlotFeatureToPlot);

export const convertPlotsToPlotsFile = (plots: PlotWithFeature[]): PlotsFile => ({
  type: 'FeatureCollection',
  features: plots.map(({ feature }) => feature),
});

export const convertPlotFeatureToPlot = (feature: PlotFeature): PlotWithFeature => {
  const { geometry, properties } = feature;
  const { POLY_ID, UNIQUE_ID, Name } = properties;
  return {
    feature,
    id: POLY_ID,
    uuid: UNIQUE_ID,
    subdivision: Name,
    edges: createPlotEdgesFromMultiPolygon(geometry),
  };
};

export const createPlotEdgesFromMultiPolygon = (geometry: MultiPolygon): PlotEdge[] =>
  geometry.coordinates.flatMap(createPlotEdgesFromPolygonCoordinates);

export const createPlotEdgesFromPolygonCoordinates = (polygonCoordinates: Position[][]): PlotEdge[] => {
  // exterior coordinates are just the first layer of polygon coordinates
  const [exteriorCoordinates] = polygonCoordinates;

  return (
    exteriorCoordinates
      .map((position, index) => {
        // wrap around to the first coordinate when on the last one
        const secondIndex = (index + 1) % exteriorCoordinates.length;

        return createPlotEdgeFromPositions(position, exteriorCoordinates[secondIndex]);
      })
      // filter out any empty edges
      .filter(({ first, second }) => first.longitude !== second.longitude || first.latitude !== second.latitude)
  );
};

export const createPlotEdgeFromPositions = (firstPosition: Position, secondPosition: Position): PlotEdge => {
  const first = convertPositionToPlotPoint(firstPosition);
  const second = convertPositionToPlotPoint(secondPosition);

  return { first, second, normalized: normalizePlotEdgeSlope(first, second) };
};

export const convertPositionToPlotPoint = ([longitude, latitude]: Position): PlotPoint => ({ longitude, latitude });
export const convertPositionsToPlotPoints = (values: Position[]) => values.map(convertPositionToPlotPoint);

interface Vector {
  x: number;
  y: number;
}

export const normalizePlotEdgeSlope = (first: PlotPoint, second: PlotPoint): NormalizedPlotEdgeData => {
  const [lowest, highest] = sortPoints([first, second]);

  const { longitude: x1, latitude: y1 } = lowest;
  const { longitude: x2, latitude: y2 } = highest;

  const slope: Vector = { x: x2 - x1, y: y2 - y1 };

  // yAtOrigin = y1 - (y * (x1 / x))
  // slope = x=20, y=30, lowest = x1=10,y1=20, highest = x2=30,y2=50
  // yAtOrigin = 20 - (30 * (10 / 20)) = 20 - (30 * (1 / 2)) = 20 - 15 = 5 => 0,5

  const multiple = 1000;
  return {
    longitudeShift: Math.floor((slope.x / slope.y) * multiple) / multiple,
    latitudeAtLongitudeOrigin: Math.floor((y1 - slope.y * (x1 / slope.x)) * multiple) / multiple,
  };
};

export const hasOverlappingEdges = (first: Plot, second: Plot): boolean =>
  first.edges.find(
    (firstEdge) => second.edges.find((secondEdge) => edgesOverlap(firstEdge, secondEdge)) !== undefined,
  ) !== undefined;

export const edgesOverlap = (first: PlotEdge, second: PlotEdge): boolean => {
  if (
    first.normalized.longitudeShift !== second.normalized.longitudeShift ||
    first.normalized.latitudeAtLongitudeOrigin !== second.normalized.latitudeAtLongitudeOrigin
  ) {
    return false;
  }

  const [firstLowest, firstHighest] = sortPoints([first.first, first.second]);
  const [secondLowest, secondHighest] = sortPoints([second.first, second.second]);

  if (firstHighest.latitude < secondLowest.latitude || secondHighest.latitude < firstLowest.latitude) {
    return false;
  }

  if (firstLowest.latitude === firstHighest.latitude) {
    // when it's flat, then we sorted by longitude, so we know lowest is leftmost
    if (firstHighest.longitude <= secondLowest.longitude || secondHighest.longitude <= firstLowest.longitude) {
      return false;
    }
  } else if (firstHighest.latitude === secondLowest.latitude || secondHighest.latitude === firstLowest.latitude) {
    return false;
  } else if (firstLowest.longitude === firstHighest.longitude) {
    // when it's vertical, have to check the longitudes
    if (firstLowest.longitude !== secondLowest.longitude) {
      return false;
    }
  }

  return true;
};

const sortPoints = (points: PlotPoint[]) =>
  points.sort((a, b) => {
    if (a.latitude < b.latitude) {
      return -1;
    }

    if (a.latitude > b.latitude) {
      return 1;
    }

    return a.longitude - b.longitude;
  });
