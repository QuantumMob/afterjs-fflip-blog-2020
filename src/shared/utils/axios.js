import axios from 'axios';

const apiResponseManager = response => {
  if (response instanceof Error) {
    throw response;
  }
  const httpStatusStr = response.status ? response.status.toString() : '';
  if (httpStatusStr.indexOf('4') === 0 || httpStatusStr.indexOf('5') === 0) {
    // properly handled from backend?
    if (typeof response.data === 'object' && response.data.error) {
      const { error } = response.data;
      if (error.type === 'TypeError') {
        throw new TypeError(error.message);
      } else if (typeof error.message === 'string') {
        throw new Error(error.message);
      }
    }
    throw new Error('Something went wrong - Unknown Error');
  }
  return response;
};
let baseUrl;
if (process.isBrowser) {
  baseUrl = new URL(process.env.RAZZLE_PUBLIC_API_URL || null);
} else {
  baseUrl = new URL(process.env.PRIVATE_API_URL || process.env.RAZZLE_PUBLIC_API_URL || null);
  baseUrl.protocol = 'http:';
}
const appAxios = axios.create({
  withCredentials: true,
  baseURL: baseUrl.href
});
appAxios.interceptors.response.use(
  result => apiResponseManager(result),
  ajaxErr => apiResponseManager(ajaxErr.response || ajaxErr)
);
const extendRequest = ({ headers = {}, headers: { cookie } }) => (
  !process.isBrowser ? {
    headers: {
      ...((headers && cookie && { cookie }) || {})
    }
  } : {}
);

const axiosUtils = {
  product: async (id, opts = {}) => {
    const { headers = {} } = opts;
    const { data } = await appAxios({
      ...extendRequest({ headers }),
      method: 'get',
      url: `/product/${parseInt(id)}`
    });

    return (data && data.payload) || null;
  },
  productListing: async (opts = {}) => {
    const { headers = {} } = opts;
    const { data } = await appAxios({
      ...extendRequest({ headers }),
      method: 'get',
      url: '/products'
    });

    return (data && data.payload) || null;
  }
};
export default axiosUtils;
export { appAxios, apiResponseManager, extendRequest };
