import { createContext } from "react"

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const BASE_URL = process.env.REACT_APP_FIREBASE_BASE_URL

const APIContext = createContext({
  apiDataCTX : {}
})

export function APIContextProvider(props) {

  const apiData = {
    firebaseAPIKey : API_KEY,
    firebaseBaseURL: BASE_URL
  }

  const context = {
    apiDataCTX : apiData
  }

  return (
    <APIContext.Provider value={context}>
      {props.children}
     </APIContext.Provider> 
  )

} 

export default APIContext