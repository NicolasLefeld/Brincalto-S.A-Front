function getDescendantProp(obj, desc) {
  const arr = desc.split(".");
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
}

export default getDescendantProp;
