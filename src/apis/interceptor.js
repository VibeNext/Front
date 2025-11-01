const clientInterceptor = {
  request: {
    onFulfilled: (config) => {
      return Promise.resolve(config);
    },
    onRejected: (error) => {
      return Promise.reject(error);
    },
    options: null,
  },
  response: {
    onFulfilled: (config) => {
      return Promise.resolve(config);
    },
    onRejected: (error) => {
      return Promise.reject(error);
    },
    options: null,
  },
};

const authClientInterceptor = {
  request: {
    onFulfilled: (config) => {
      let token = localStorage.getItem("token");
      if (token) {
        token = JSON.parse(token);
        config.headers.Authorization = `${token.grantType} ${token.accessToken}`;
      }
      return Promise.resolve(config);
    },
    onRejected: (error) => {
      return Promise.reject(error);
    },
    options: null,
  },
  response: {
    onFulfilled: (config) => {
      return Promise.resolve(config);
    },
    onRejected: (error) => {
      return Promise.reject(error);
    },
    options: null,
  },
};

export { clientInterceptor, authClientInterceptor };
