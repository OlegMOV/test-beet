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

export interface IDataAPI {
  [propName: string]: string | number | any;
}

export interface IFetchAxios {
  url: string;
  method: methodAPI;
  params: IDataAPI | {};
  headers: IDataAPI | {};
  data: IDataAPI | {};
}

export const createFormData = (data: IDataAPI): FormData => {
  const formData = new FormData();
  if (data !== undefined) {
    Object.keys(data).forEach((i) => formData.append(i, data[i]));
  }
  return formData;
};

let options: IFetchAxios = {
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

  // Изменение данных хранилища
  const changePartState = (partialData: IDataAPI[]): void =>
    setResponseAPI([...responseAPI, ...partialData]);

  // Функция для формирования запроса
  const createQuery = (config: IFetchAxios): void => {
    options = {
      url: config.url,
      method: config.method,
      params: config.params !== undefined ? config.params : {},
      headers: config.headers !== undefined ? config.data : {}, // 'Authorization': `Basic ${token}`
      data: config.data !== undefined ? config.data : {},
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
