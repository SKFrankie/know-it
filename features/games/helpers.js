import dateToString from "../../helpers/dateToString";
//  function to check if date is in current week
const isCurrentWeek = (date) => {
  const [start, end] = getFirstAndLastDayOfWeek();
  return date >= start && date <= end;
};

const getFirstAndLastDayOfWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);

  const start = new Date(today.setDate(diff));
  const end = new Date(today.setDate(diff + 6));
  end.setHours(23, 59, 59, 0);
  return [start, end];
};

const getFirstDayOfLastWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1) - 7;
  const date = new Date(today.setDate(diff));
  return dateToString(date);
};

const getLastDayOfLastWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1) - 7;
  const date = new Date(today.setDate(diff + 6));
  // IMPORTANT if you ever use this function for something else than display you need to add the following line
  // date.setHours(23,59,59,0);
  return dateToString(date);
};

const getFirstDayOfWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const date = new Date(today.setDate(diff));
  return dateToString(date);
};

const getLastDayOfWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const date = new Date(today.setDate(diff + 6));
  // IMPORTANT if you ever use this function for something else than display you need to add the following line
  // date.setHours(23,59,59,0);
  return dateToString(date);
};
export {
  isCurrentWeek,
  getFirstDayOfLastWeek,
  getLastDayOfLastWeek,
  getFirstDayOfWeek,
  getLastDayOfWeek,
};
