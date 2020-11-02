import { useState, useReducer, useEffect } from 'react';
import Axios from 'axios';

export const useDataApi = (initialUrl, initialMethod, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [method, setMethod] = useState(initialMethod);
  const [postData, setPostData] = useState({});

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      if (url !== '') {
        console.log('URL----> ', url);
        try {
          const axiosParams = { method, url, data: postData };

          const resultat = await Axios(axiosParams);
          if (!ignore) {
            dispatch({ type: 'FETCH_SUCCESS', payload: resultat.data });
          }
        } catch (e) {
          if (!ignore) {
            setMethod('get');
            dispatch({ type: 'FETCH_FAILURE' });
          }
        }
      } else {
        dispatch({ type: 'NO_FETCH' });
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return [state, setUrl, setMethod, setPostData];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    case 'NO_FETCH':
      return { ...state, isLoading: false, isError: false };

    default:
      throw new Error('dataFetchReducer Error in UseDataApi');
  }
};
