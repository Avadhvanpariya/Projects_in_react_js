// your-date-utils.js

// Function to check if two dates are on the same day
export const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Function to get the date 'n' days ago
export const getPastDays = (date, n) => {
  const pastDate = new Date(date);
  pastDate.setDate(date.getDate() - n);
  return pastDate;
};

// Function to get the start of the month for a given date
export const getStartOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

// Function to get the start of the last month for a given date
export const getStartOfLastMonth = (date) => {
  const lastMonth = new Date(date);
  lastMonth.setMonth(date.getMonth() - 1);
  return getStartOfMonth(lastMonth);
};

// Function to get the start of the last 3 months for a given date
export const getStartOfLast3Months = (date) => {
  const last3Months = new Date(date);
  last3Months.setMonth(date.getMonth() - 3);
  return getStartOfMonth(last3Months);
};

// Function to get the start of the last year for a given date
export const getStartOfLastYear = (date) => {
  const lastYear = new Date(date);
  lastYear.setFullYear(date.getFullYear() - 1);
  return getStartOfMonth(lastYear);
};
