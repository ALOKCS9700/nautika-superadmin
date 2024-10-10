// src/api/dashboardInfoApi.ts

import axios from "axios";

// Define the types for API response
export interface TopStock {
  _id: string;
  stockName: string;
  symbol: string;
  totalAmount: number;
}

export interface LatestUser {
  _id: string;
  email: string;
  fullName: string;
  userPicture: string;
  joinedOn: string;
}

export interface DashboardInfo {
  topStocks: TopStock[];
  latestUsers: LatestUser[];
  totalStocks: number;
  totalBlogs: any;
  totalCategories: any;
  totalCommodities: number;
  totalUsers: number;
  totalInvested: number;
  totalStockProfitLoss: number;
  lastUpdatedStock: TopStock;
  totalStockValue: number;
  totalCommodityValue: number;
  userWithHighestWallet: {
    _id: string;
    email: string;
    fullName: string;
    wallet: number;
  };
  stocksByStatus: {
    _id: string;
    count: number;
  }[];
}

interface DashboardResponse {
  message: string;
  status: boolean;
  data: DashboardInfo;
}

// Define the API URL
const API_URL = "https://oglitz-backend-node.onrender.com/admin/nautika/dashboard";

// Function to fetch dashboard info
export const fetchDashboardInfo = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
    // if (response.data.status) {
    // } else {
    //   console.error("Failed to fetch dashboard info:", response.data.message);
    //   return null;
    // }
  } catch (error) {
    console.error("Error fetching dashboard info:", error);
    return null;
  }
};
