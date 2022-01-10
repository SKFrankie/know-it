//  function to check if date is in current week
const isCurrentWeek = (date) => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
  return date >= start && date <= end;
};

export { isCurrentWeek };