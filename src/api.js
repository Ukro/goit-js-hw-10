import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com',
  headers: {
    common: {
      'x-api-key': 'live_OTZ0kZEMYSwxwDnB16kaxm9MCIbUXWeuUaCndnhlVeVaPIZzx5rHDkvio8Le0nJh',
    },
  },
});

export async function fetchBreeds() {
  try {
    const response = await axiosInstance.get('/v1/breeds');
    //console.error(response);

    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
