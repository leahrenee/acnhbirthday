//import default export: import test from 'axios'

import axios, { AxiosInstance } from "axios";

class ACNHApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.APILINK,
      timeout: 1000,
      headers: { "X-API-KEY": process.env.APIKEY },
    });

    this.api.interceptors.request.use((request) => {
      console.log("starting Request");
      return request;
    });
  }

  public async getVillagerByBirthday( birthday: Number, birthmonth: Number): Promise<any> {
    const { data } = await this.api.get("villagers", {
      params: { birthday, birthmonth },
    });
    return data;
  }
}

// const getVillager = async (name: string) => {
//   const { data } = await acnhAPI.get("/villagers", { params: { name } });
//   console.log(data);
//   return data;
// };

export const api = new ACNHApi()
