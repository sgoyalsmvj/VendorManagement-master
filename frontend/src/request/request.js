import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "@/config/serverApiConfig";
import { token as tokenCookies } from "@/auth";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";

const permissions = JSON.parse(localStorage.getItem('auth')).permissions;
const headersInstance = { [ACCESS_TOKEN_NAME]: tokenCookies.get() };

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    ...headersInstance,
  },
});

const request = {
  create: async (entity, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entity + "/create", jsonData);
      console.log(response)
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async (entity, id) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entity + "/read/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async (entity, id, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(
        entity + "/update/" + id,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (entity, id, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.delete(entity + "/delete/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async (entity, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      let filter = option.filter ? "filter=" + option.filter : "";
      let equal = option.equal ? "&equal=" + option.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axiosInstance.get(entity + "/filter" + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async (entity, source, option = {}) => {
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    try {
      let query = "";
      if (option !== {}) {
        let fields = option.fields ? "fields=" + option.fields : "";
        let question = option.question ? "&q=" + option.question : "";
        query = `?${fields}${question}`;
      }
      // headersInstance.cancelToken = source.token;
      const response = await axiosInstance.get(entity + "/search" + query, {
        cancelToken: source.token,
      });

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (entity, option = {}) => {
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    try {
      let query = "";
      if (option !== {}) {
        let page = option.page ? "page=" + option.page : "";
        let items = option.items ? "&items=" + option.items : "";
        query = `?${page}${items}`;
      }

      const response = await axiosInstance.get(entity + "/list" + query);

      let filteredResponse = response;
      if (entity == "product" && ((permissions['services'] && permissions['services'].length > 0) || permissions == 'superadmin')) {
        filteredResponse = {
          ...response, data: {
            ...response.data, 'result': response.data.result.filter(item => {
              const { _id, departments } = item;
              return permissions == 'superadmin' || (
                permissions['services'].includes(_id)
                &&
                permissions['departments'].some(dept => departments && departments.includes(dept))
              );
            })
          }
        };
      } else if (entity == "vendor" && ((permissions['vendors'] && permissions['vendors'].length > 0) || permissions == 'superadmin')) {
        filteredResponse = {
          ...response, data: {
            ...response.data, 'result': response.data.result.filter(item => {
              const { _id, departments } = item;
              return permissions == 'superadmin' || (
                permissions['vendors'].includes(_id)
                &&
                permissions['departments'].some(dept => departments && departments.includes(dept))
              );
            })
          }
        };
      } else if (entity == "job" && ((permissions['jobs'] && permissions['jobs'].length > 0) || permissions == 'superadmin')) {
        filteredResponse = {
          ...response, data: {
            ...response.data, 'result': response.data.result.filter(item => {
              const { _id, departments } = item;
              return permissions == 'superadmin' || (
                permissions['jobs'].includes(_id)
                &&
                permissions['departments'].some(dept => departments && departments.includes(dept))
              );
            })
          }
        };
      }
      console.log(response, filteredResponse);

      return successHandler(filteredResponse);
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async (entityUrl, jsonData, option = {}) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async (entityUrl) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async (entityUrl, jsonData) => {
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    // const CancelToken = await axiosInstance.CancelToken;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
