import serviceInstance from "../axiosInstance/requestHandler";


const authService = {
  onRegister: (request) =>
    serviceInstance
      .post(`/auth/signup`, request)
      .then(({ data, status }) => ({
        ...data,
        status,
      })),

  onLogin: (request) =>
    serviceInstance
      .post(`/auth/login `, request)
      .then(({ data, status }) => ({
        ...data,
        status,
      })),


      confirmEmail: (data) =>
      serviceInstance
        .post(`/ConfirmEmail`,data)
        .then(({ data, status }) => ({
          ...data,
          status,
        })),

        resetPassword: (data) =>
        serviceInstance
          .post(`/ResetPassword`,data)
          .then(({ data, status }) => ({
            ...data,
            status,
          })),

        forgotPassword: (email) =>
        serviceInstance
          .post(`/ForgetPassword/${email}`)
          .then(({ data, status }) => ({
            ...data,
            status,
          })),

        resendCode: (email) =>
        serviceInstance
          .post(`$/ResendActivationEmail/${email}`)
          .then(({ data, status }) => ({
            ...data,
            status,
          })),

  logout: (request) =>
    serviceInstance
      .post(`$/Account/Logout`,{})
      .then(({ data, status }) => ({
        ...data,
        status,
      })),
};

export default authService;
