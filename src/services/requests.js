import api from "../config/axios";

const call = async (page, pageSize, searchQuery, options = {}) => {
 if (searchQuery) {
  searchQuery = searchQuery.toLowerCase();
  return await api.get(
   `/cards?page=${page}&pageSize=${pageSize}&q=name:*${searchQuery}*`,
   options
  );
 }
 return await api.get(`/cards?page=${page}&pageSize=${pageSize}`, options);
};

// Get all pokemon cards
export const getAllCardsPage = async (page, pageSize, query, options = {}) => {
 try {
  const response = await call(page, pageSize, query, options);
  //   console.log("response", response);
  return response.data.data;
 } catch (error) {
  console.error(error);
 }
};
