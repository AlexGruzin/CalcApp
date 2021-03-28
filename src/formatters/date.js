import { format } from 'date-fns';

export const getFormattedDateItem = date => (date ? format(date, `MMMM dd, yyyy @ H:mm aaaa`) : '');
