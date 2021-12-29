const dateToString = (d) => {
  if (!d) return "";

  const date = new Date(d);
  const stringDate = `${date.getDate().toString().padStart(2, "0")} ${date
    .toLocaleString("default", { month: "long" })
    .toString()} ${date.getFullYear().toString().padStart(2, "0")}`;
  return stringDate;
};

export default dateToString;
