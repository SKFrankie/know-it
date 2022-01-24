const daysUntilNextMonth = () => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const daysUntilNextMonth = Math.ceil((nextMonth - today) / (1000 * 60 * 60 * 24));
  return daysUntilNextMonth;
};


export default daysUntilNextMonth;