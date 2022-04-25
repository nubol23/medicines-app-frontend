export const emptyObj = (obj: Object) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const formatDate = (dateStr: string) => {
  let res: string = dateStr.split("T").at(0)!;
  const parts = res.split("-");
  res = `${parts.at(2)} / ${parts.at(1)} / ${parts.at(0)}`;
  return res;
};

export const formatFormDate = (dateStr: string) => {
  return dateStr.split("T").at(0);
};
