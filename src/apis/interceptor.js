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
      const authStore = localStorage.getItem('auth-store');

      if (authStore) {
        const parsed = JSON.parse(authStore);
        const user = parsed?.state?.user;

        if (user?.accessToken && user?.grantType) {
          config.headers.Authorization = `${user.grantType} ${user.accessToken}`;
        }
      }

      return Promise.resolve(config);
    },
    onRejected: (error) => Promise.reject(error),
  },
  response: {
    onFulfilled: (res) => Promise.resolve(res),
    onRejected: (err) => Promise.reject(err),
  },
};

export { authClientInterceptor, clientInterceptor };
