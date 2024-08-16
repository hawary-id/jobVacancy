import { format } from 'date-fns';
export function FormatNumber(number) {
    if (number === null || number === undefined || isNaN(number)) {
        return '-';
    }
    return number.toLocaleString();
}

export function FormatDate(date, formatDate="dd-MM-yyyy") {
    if (!date) return '';
    return format(new Date(date), formatDate);
}
