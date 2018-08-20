export class Canvas {
    /** Transforms polar coordinates into cartesian coordinates */
    static polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
    ): { x: number; y: number } => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    /** Creates path description of a partial arc that fits inside a circle of the same radius */
    static describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
        const start = Canvas.polarToCartesian(x, y, radius, endAngle);
        const end = Canvas.polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

        return d;
    };
}
