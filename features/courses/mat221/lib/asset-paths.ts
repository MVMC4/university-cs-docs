export const mat221AssetPaths = {
  videos: {
    trigonometricMethods: '/videos/sem3/mat221/mat221-lesson67-review.mp4',
  },
  captions: {
    trigonometricMethods: '/videos/sem3/mat221/mat221-lesson67-review.vtt',
  },
  posters: {
    trigonometricMethods: '/images/sem3/mat221/video-posters/mat221-lesson67-poster.png',
  },
  diagrams: {
    applicationsWasher: '/images/sem3/mat221/diagrams/applications-washer.svg',
    foundationsArea: '/images/sem3/mat221/diagrams/foundations-area.svg',
    ftcFlow: '/images/sem3/mat221/diagrams/ftc-flow.svg',
    improperLimit: '/images/sem3/mat221/diagrams/improper-limit.svg',
    lhopitalRates: '/images/sem3/mat221/diagrams/lhopital-rates.svg',
    liateLadder: '/images/sem3/mat221/diagrams/liate-ladder.svg',
    numericalRules: '/images/sem3/mat221/diagrams/numerical-rules.svg',
    partialsSplit: '/images/sem3/mat221/diagrams/partials-split.svg',
    partsTabular: '/images/sem3/mat221/diagrams/parts-tabular.svg',
    powerInterval: '/images/sem3/mat221/diagrams/power-interval.svg',
    seriesTests: '/images/sem3/mat221/diagrams/series-tests.svg',
    substitutionU: '/images/sem3/mat221/diagrams/substitution-u.svg',
    taylorFit: '/images/sem3/mat221/diagrams/taylor-fit.svg',
    trigTriangle: '/images/sem3/mat221/diagrams/trig-triangle.svg',
  },
} as const;

export type Mat221DiagramKey = keyof typeof mat221AssetPaths.diagrams;
