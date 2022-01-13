import dateToString from "../../helpers/dateToString";
//  function to check if date is in current week
const isCurrentWeek = (date) => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
  return date >= start && date <= end;
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
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const date = new Date(today.setDate(diff + 6));
  return dateToString(date);
};
export { isCurrentWeek, getFirstDayOfLastWeek, getLastDayOfLastWeek, getFirstDayOfWeek, getLastDayOfWeek };
