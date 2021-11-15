const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL

export async function getTMDBData({category, type, queryString}) {
  const response = await fetch(`${BASE_URL}${category}/${type}?api_key=${API_KEY}&${queryString}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch DATA.');
  }

  return data;
}


export async function getTMDBDataEach({category, id, type, queryString}) {
  const response = await fetch(`${BASE_URL}${category}/${id}/${type}?api_key=${API_KEY}&${queryString}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch DATA.');
  }

  return data;
}

export async function getTMDBGetDetails({category, id, queryString, append_to_response=null}) {
  const response = await fetch(`${BASE_URL}${category}/${id}?api_key=${API_KEY}&${queryString}&append_to_response=${append_to_response}`);
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch DATA.');
  }

  return data;
}