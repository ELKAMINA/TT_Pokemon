export const uniqueArray = (arr) => {
 arr.filter(
  (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
 );
};

export const compareArrays = (array1, array2) => {
 let areEquals;
 if (array1.length !== array2.length) return false;
 if (array1.length === 0 && array2.length === 0) return true;
 if (
  (array1.length === 0 && array2.length > 0) ||
  (array1.length === 0 && array2.length > 0)
 )
  return false;
 areEquals =
  array1.length === array2.length &&
  array1.every((value, index) => value === array2[index]);

 return areEquals;
};
