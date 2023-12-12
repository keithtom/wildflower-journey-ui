export const handleTimeUntil = (date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const otherDate = new Date(date);
  const daysAgo = Math.round(Math.abs((today - otherDate) / oneDay));
  const timeUntil =
    daysAgo >= 14
      ? `${Math.round(daysAgo / 7)} weeks ago`
      : daysAgo >= 7 && daysAgo < 14
      ? `1 week ago`
      : daysAgo > 1 && daysAgo < 7
      ? `${daysAgo} days ago`
      : daysAgo === 1
      ? `yesterday`
      : `today`;
  return timeUntil;
};

export const handleTimeSince = (date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const otherDate = new Date(date);
  const daysSince = Math.round(Math.abs((otherDate - today) / oneDay));
  const timeSince =
    daysSince >= 14
      ? `${Math.round(daysSince / 7)} weeks`
      : daysSince >= 7 && daysSince < 14
      ? `1 week`
      : daysSince > 1 && daysSince < 7
      ? `${daysSince} days`
      : daysSince === 1
      ? `1 day`
      : `0 days`;
  return timeSince;
};

export const handleFindMatchingItems = (array1, array2, property) => {
  const matchingItems = array1.filter((item1) =>
    array2.some((item2) => item1[property] === item2[property])
  );
  return matchingItems;
};
