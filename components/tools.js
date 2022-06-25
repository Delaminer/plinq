// Helpful functions are stored here. So far, these are used for working with dates

// Get a Date object of when the next contact should be based on the last contact and contact interval
export const calculateNextContact = (last, interval) => {
    last.setUTCDate(last.getUTCDate() + interval);
    return last;
}

// Comparator for sorting two string dates (the strings are passed into the date constructor)
export const sortDates = (a, b) =>
    (new Date(a.lastContact).getTime() + a.contactInterval * 24 * 60 * 60 * 1000) -
    (new Date(b.lastContact).getTime() + b.contactInterval * 24 * 60 * 60 * 1000);

// Array of the months in display form
export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

// Display a date object as 'Jan 1'
export const displayDate = (date) => `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
// Display a date object as '2022-01-31'
export const displayDate2 = (date) => date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1).toString().padStart(2, "0") + "-" + date.getUTCDate().toString().padStart(2, "0");
// Display a date object as 'Jan 1, 2022'
export const displayDate3 = (date) => `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;