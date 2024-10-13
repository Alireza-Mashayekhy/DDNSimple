import { RootState } from '@/types';

export const getUploadData = (state: RootState) => state.uploadData;
export const getStockData = (state: RootState) => state.stockData;
export const getCustomersData = (state: RootState) => state.customersData;
export const getFeeData = (state: RootState) => state.feeData;
export const getAuthentication = (state: RootState) => state.authentication;
export const getUsers = (state: RootState) => state.users;
export const getInvestment = (state: RootState) => state.investment;
