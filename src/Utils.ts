export const compareObjects = (o1: object, o2: object): boolean => {
  return JSON.parse(JSON.stringify(o1)) === JSON.parse(JSON.stringify(o2))
    ? true
    : false
}
