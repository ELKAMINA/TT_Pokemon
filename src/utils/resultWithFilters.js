export const getResultWithFilters = (results, filters) => {
 console.log("getResultWithFilters", filters);
 if (filters?.length === 0) return results;
 filters?.forEach((element) => {
  switch (element) {
   case "":
    break;
   case "Holo rare":
    results = results.filter((result) => result.rarity === "Rare Holo");
    break;
   case "Descending prices":
    results = results.sort((a, b) => b.prices[0].low - a.prices[0].low);
    break;
   case "Ascending prices":
    results = results.sort((a, b) => a.prices[0].low - b.prices[0].low);
    break;
   default:
    break;
  }
 });
 return results;
};
