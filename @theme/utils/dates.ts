export const formatDateString = (dateString) => {
  let dateWithoutTimezone = dateString.toString().replace('Z', '');
  const date = new Date(dateWithoutTimezone);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}