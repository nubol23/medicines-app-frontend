export const emptyObj = (obj) => {
  return obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype
}

export const formatDate = (dateStr) => {
  let res = dateStr.split("T").at(0)
  const parts = res.split("-")
  res = `${parts.at(2)}/${parts.at(1)}/${parts.at(0)}`
  return res
}