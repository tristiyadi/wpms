/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPackages = async () => {
  const response = await api.get("/admin/packages");
  return response.data;
};

export const createPackage = async (data: any) => {
  const response = await api.post("/admin/packages", data);
  return response.data;
};

export const updatePackage = async (id: string, data: any) => {
  const response = await api.put(`/admin/packages/${id}`, data);
  return response.data;
};

export const deletePackage = async (id: string) => {
  await api.delete(`/admin/packages/${id}`);
};
