import { isInArray } from "../../util";

export interface URLParams {
  key: string;
  value: string;
}

const getUrlParams = (url: string, validParams?: string[]): URLParams[] => {
  const queryParams = url.split('?');

  if(queryParams.length === 1) {
    return [];
  }

  const keyValueParams = queryParams[1].split('&');
  const objectParams = keyValueParams
    .map(query => {
      const [key, value] = query.split('=');
      return { key, value };
    })
    .filter(query => query.key !== 'id' && query.value !== '');
    

  if(validParams){
    return objectParams.filter(field => isInArray(field.key, validParams));
  }

  return objectParams;
}

export {
  getUrlParams
}