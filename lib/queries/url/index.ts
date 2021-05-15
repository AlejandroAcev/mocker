export interface URLParams {
  key: string;
  value: string;
}

const getUrlParams = (url: string): URLParams[] => {
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
    .filter(query => query.key !== 'id');
    
  return objectParams;
}

export {
  getUrlParams
}