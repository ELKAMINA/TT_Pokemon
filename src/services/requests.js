import api from "../config/axios";

// Get all pokemon cards
export const getAllCardsPage = async (page, pageSize, options = {}) => {
 try {
  const response = await api.get(
   `/cards?page=${page}&pageSize=${pageSize}`,
   options
  );
  return response.data.data;
 } catch (error) {
  console.error(error);
 }
};
