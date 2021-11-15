import {useState, useCallback} from 'react';

const useFetchAPI = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    
    async function getTMDBData({category, type, queryString}) {
      const response = await fetch(``);
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quote.');
      }
    
      return data;
    }

    getTMDBData()

    return {}

}

export default useFetchAPI;