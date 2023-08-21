// export const baseURL = 'http://192.168.1.25:5000/api/v1';
const isDev = process.env.REACT_APP_NODE_ENV === 'development' ? true : false;
// export const baseURL = isDev
//   ? process.env.REACT_APP_DEV_API_URL
//   : process.env.REACT_APP_API_URL;
// export const mainURL = baseURL + '/api/v1';
export const mainURL = 'http://localhost:8081/api/v1';
export const baseAPI24h = 'https://api.vietqr.io/v2/business';
