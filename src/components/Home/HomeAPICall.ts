import axios from "axios";
// Define the API URL
const API_URL =
  "https://oglitz-backend-node.onrender.com/admin/nautika/dashboard";

// Function to fetch dashboard info
export const fetchDashboardInfo = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard info:", error);
    return null;
  }
};
