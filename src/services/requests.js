import api from "../config/axios";

const call = async (page, pageSize, searchQuery, filters, options = {}) => {
 console.log("filters ", filters);
 if (searchQuery && filters.length === 0) {
  searchQuery = searchQuery.toLowerCase();
  return await api.get(
   `/cards?page=${page}&pageSize=${pageSize}&q=name:*${searchQuery}*`,
   options
  );
 } else if (searchQuery === "" && filters.length > 0) {
  if (filters.includes("Holo rare")) {
   console.log("filters ", filters);
   return await api.get(
    `/cards?page=${page}&pageSize=${pageSize}&q=rarity:*Holo*`,
    options
   );
  }
 } else if (searchQuery && filters.length > 0) {
  searchQuery = searchQuery.toLowerCase();
  if (filters.includes("Holo rare")) {

   return await api.get(
    `/cards?page=${page}&pageSize=${pageSize}&q=name:*${searchQuery}* rarity:*Holo*`,
    options
   );
  }
 }
 return await api.get(`/cards?page=${page}&pageSize=${pageSize}`, options);
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
  console.error(error);
 }
};
