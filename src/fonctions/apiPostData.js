import Axios from 'axios';

export const apiPostData = (url, method, data, onSuccess, onFailure, next) => {
  async function fetchData() {
    try {
      console.log('apiPostData try');
      const result = await Axios({ method, url, data });
      onSuccess(result, next);
    } catch (e) {
      console.log('apiPostData catch', e);
      onFailure();
    }
  }

  fetchData();
};
