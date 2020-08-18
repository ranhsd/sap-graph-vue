import axios from "axios";

const client = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VUE_APP_PUBLIC_API_KEY}`,
  },
});

export async function getProducts(top, skip) {
  return await client.get("beta/Customers", {
    params: {
      $top: top,
      $skip: skip,
    },
  });
}

export async function getSalesOrders() {
  const {
    data: { value },
  } = await client.get("beta/SalesOrders", {
    params: {},
  });

  return value;
}

export async function getSalesOrder(id){
  const { data } = await client.get(`beta/SalesOrders/${id}`);
  return data;
}
