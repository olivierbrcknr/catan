export const secToMin = (sec: number, alwaysShowSecs = false): string => {
  const min = Math.floor(sec / 60);

  const secPrint = sec - min * 60;

  if (secPrint > 0 || alwaysShowSecs) {
    return min + ":" + (secPrint <= 0 ? "0" : "") + secPrint;
  } else {
    return min.toString();
  }
};
