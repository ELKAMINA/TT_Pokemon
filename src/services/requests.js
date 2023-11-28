import api from "../config/axios";

const call = async (page, pageSize, searchQuery, filters, options = {}) => {
 let endpoint = "";
 if (searchQuery.length > 0 && filters.length === 0) {
  endpoint = getSearchQueries(searchQuery, page, pageSize);
 } else if (searchQuery.length === 0 && filters.length > 0) {
  if (filters.includes("Holo rare")) {
   endpoint = `/cards?page=${page}&pageSize=${pageSize}&q=rarity:*Holo*`;
  } else endpoint = `/cards?page=${page}&pageSize=${pageSize}`;
 } else if (searchQuery.length > 0 && filters.length > 0) {
  endpoint = getSearchQueries(searchQuery, page, pageSize);
  if (filters.includes("Holo rare")) {
   endpoint = getSearchQueries(searchQuery, page, pageSize).concat(
    " rarity:*Holo*"
   );
  }
 } else endpoint = `/cards?page=${page}&pageSize=${pageSize}`;
 console.log("ici 4 ");

 //  console.log("filters ", filters);
 //  console.log("search ", searchQuery);
 //  console.log("filters ", endpoint);
 return await api.get(endpoint, options);
};

// Get all pokemon cards
export const getAllCardsPage = async (
 page,
 pageSize,
 query,
 filters,
 options = {}
) => {
 try {
  const response = await call(page, pageSize, query, filters, options);
  //   console.log("response", response);
  return response.data.data;
 } catch (error) {
  console.log("ici 5 ");

  if (error.name === "CanceledError") {
   console.log("Fetch aborted", error.name);
  }
 }
};

const getSearchQueries = (searchQuery, page, pageSize) => {
 const queryParts = searchQuery.map((item) => `name:*${item}*`);
 const queryString = queryParts.join(" ");
 return `/cards?page=${page}&pageSize=${pageSize}&q=${queryString}`;
};
