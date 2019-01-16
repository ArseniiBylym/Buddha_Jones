import { formatNumber } from 'accounting';

export class MoneyHandler {
    public static formatAsDollars = (value: number): string => {
        return '$' + formatNumber(value, 2, ' ');
    };
}
