export function formatDate(date: Date, h: number): Date {
    let fullDateArr = String(h).split('.');
    let hours = +fullDateArr[0] * 1000 * 60 * 60;
    let minutes = 0;
    if (fullDateArr[1]) {
        let min = fullDateArr[1];
        switch (min) {
            case '25':
                minutes = 15 * 60 * 1000;
                break;
            case '5':
                minutes = 30 * 60 * 1000;
                break;
            case '50':
                minutes = 30 * 60 * 1000;
                break;
            case '75':
                minutes = 45 * 60 * 1000; 
                break;
            default: 
                break;
        }
    }
    const formatedDate = new Date(date.getTime() + hours + minutes);
    return formatedDate;
}