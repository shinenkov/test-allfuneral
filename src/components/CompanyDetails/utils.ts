export function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return month + '.' + day + '.' + year;
}

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getDate());
}

export function getDateString(dateString: string | undefined) {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (isValidDate(date)) {
    return getFormattedDate(date);
  } else {
    return dateString;
  }
}
