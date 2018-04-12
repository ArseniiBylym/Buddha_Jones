import { createSelector } from 'reselect';

// Getters
export const getSize = (props) => props.size;

// Selectors
export const getHalfOfSize = createSelector(
    [getSize],
    (size) => size / 2
);

export const getStrokeWidth = createSelector(
    [getSize],
    (size) => size / 10
);

export const getArcRadius = createSelector(
    [getHalfOfSize, getStrokeWidth],
    (halfSize, strokeWidth) => halfSize - strokeWidth
);

export const getArcDescription = createSelector(
    [getHalfOfSize, getArcRadius],
    (halfSize, arcRadius) => describeArc(halfSize, halfSize, arcRadius, -45, 45)
);

// Helpers
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
};
