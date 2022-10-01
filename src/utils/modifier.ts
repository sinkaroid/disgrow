export const getDate = (date: string) => {
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  //if undefined, return null
  if (monthArr[parseInt(month) - 1] === undefined) return "";
  const monthName = monthArr[parseInt(month) - 1];
  return `${monthName} ${day}, ${year}`;
};

export const isNumeric = (val: string) : boolean => {
  return !isNaN(Number(val));
};


export const removeHTMLTags = (str: string) => {
  return str.replace(/<(?:.|\n)*?>/gm, "").replace(/\n/g, "");
};

export const removePlusFromStr = (str: string) => {
  return str.replace(/\(.*\)/g, "").replace(/,/g, "").trim();
};

export const keepPlusFromStr = (str: string) => {
  if (str.includes("---")) return null;
  return str.match(/\(.*\)/g)?.toString().replace(/[()]/g, "");
};

export const keepVoteNumbers = (str: string) => {
  return str.replace(/\(.*\)/g, "").replace(/,/g, "").trim();
};

export const matchAfterPlus = (str: string) => {
  return str.match(/\+[0-9]*/g)?.toString();
};
