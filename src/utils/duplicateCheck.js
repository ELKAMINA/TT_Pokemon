export const uniqueArray = (arr) => {
 arr.filter(
  (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
 );
};
