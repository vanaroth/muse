import { message } from 'antd';
import Axios from 'axios';

export async function getFetchData(url, setterData, ignore, id = false) {
  const customURL = url + (id ? id : '');
  try {
    const result = await Axios.get(customURL);
    const { dataResponse } = result.data;
    console.log('dataResponse', dataResponse);

    if (!ignore) setterData(dataResponse);
  } catch (err) {
    message.error(`Problème de connexion au server pour l'URL ${customURL}`);
  }
}
