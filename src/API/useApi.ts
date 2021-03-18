import { useState, useEffect } from "react";
import axios from "axios";

export enum statusAPI {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum methodAPI {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export interface IFetchAxios {
  url: string;
  method: methodAPI;
  params: IDataAPI;
  headers: IDataAPI;
  data: IDataAPI;
}

export interface IDataAPI {
  [propName: string]: string | number | any;
}

let options = {
  url: "",
  method: methodAPI.get,
  params: {},
  headers: {},
  data: {},
};

export const useFetchAPI = (): [IDataAPI[], Function, statusAPI] => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<statusAPI>(statusAPI.SUCCESS);
  const [responseAPI, setResponseAPI] = useState<IDataAPI[]>([]);

  // Зміна стейту на основі даних отриманих з серверу
  const changePartState = (partialData: IDataAPI[]): void =>
    setResponseAPI([...responseAPI, ...partialData]);

  // Зовнішя функція для Формування запиту на основі отриманих параметрів
  const createQuery = (config: IFetchAxios): void => {
    const formData = new FormData();
    if (config.data !== undefined) {
      Object.keys(config.data).forEach((i) =>
        formData.append(i, config.data[i])
      );
    }
    options = {
      url: config.url,
      params: config.params !== undefined ? config.params : "",
      method: config.method,
      data: config.data !== undefined ? config.data : "",
      headers: {},
      // config.data !== undefined
      //   ? { Accept: "application/json", "Content-type": "application/json" }
      //   : {},
    };
    setUrl(options.url);
  };

  useEffect(() => {
    if (!url) return;
    setIsLoading(statusAPI.LOADING);
    axios(options)
      .then((res) => {
        // *****************************************
        // Тот случай когда сервер не возвращает изменненый объект
        // а присылает сторку по результату выполнения запроса
        if (typeof res.data === "string")
          if (res.data.startsWith("success")) {
            changePartState([options.data]);
            setIsLoading(statusAPI.SUCCESS);
          } else {
            changePartState([]);
            setIsLoading(statusAPI.ERROR);
          }
        // ****************************************
        else {
          changePartState(res.data);
          setIsLoading(statusAPI.SUCCESS);
        }
      })
      .catch(() => {
        changePartState([]);
        setIsLoading(statusAPI.ERROR);
      })
      .finally(() => setUrl(""));
  }, [url]); 
  return [responseAPI, createQuery, isLoading];
};
