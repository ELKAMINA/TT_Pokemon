import { pricing } from "./pricing";
import { uniqueArray } from "./duplicateCheck";

export const getResultWithFilters = (results, filters) => {
 console.log("getResultWithFilters", filters);
 if (filters?.length === 0) return results;
 filters?.forEach((element) => {
  switch (element) {
   case "":
    break;
   case "Holo rare":
    results = results.filter((result) => result.rarity?.includes("Rare Holo"));
    break;
   case "Descending prices":
    results = results.sort((a, b) => {
     const aPrice = a.cardmarket?.prices?.averageSellPrice
      ? pricing(a.cardmarket?.prices?.averageSellPrice).toFixed(1)
      : 1;
     const bPrice = b.cardmarket?.prices?.averageSellPrice
      ? pricing(b.cardmarket?.prices?.averageSellPrice).toFixed(1)
      : 1;
     return bPrice - aPrice;
    });
    break;
   case "Ascending prices":
    results = results.sort((a, b) => {
     const aPrice = a.cardmarket?.prices?.averageSellPrice
      ? pricing(a.cardmarket?.prices?.averageSellPrice).toFixed(1)
      : 1;
     const bPrice = b.cardmarket?.prices?.averageSellPrice
      ? pricing(b.cardmarket?.prices?.averageSellPrice).toFixed(1)
      : 1;
     return aPrice - bPrice;
    });
    break;
   default:
    break;
  }
 });
 let resultWithoutDuplicates = uniqueArray(results);
 return resultWithoutDuplicates;
};
