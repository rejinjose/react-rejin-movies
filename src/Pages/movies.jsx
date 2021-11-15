import { useEffect,useState,useRef,useCallback } from "react"
import { NavLink } from "react-router-dom"
import useQuery from "../hooks/use-query"
import useHttp from "../hooks/use-http"
import { getTMDBData } from "../lib/tmdbapi"
import classes from './movies.module.scss'
import DummyPerson from '../images/common/dummy.jpg'

const IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [movieNames, setMovieNames] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(false)
  const {sendRequest, data, error, status} = useHttp(getTMDBData, true)
  let query = useQuery()
  let urlQuery = query.get('q')

  const observer = useRef()

  let urlQueryString = ''
  if (urlQuery === 'ratedRrequest') {
    urlQueryString = `sort_by=popularity.desc`
  } else if(urlQuery === 'mostPopularRequest') {
    urlQueryString = `certification_country=US&certification=R&sort_by=vote_average.desc`
  } else if(urlQuery === 'bestmoviesfrom2010') {
    urlQueryString = `primary_release_year=2018&sort_by=vote_average.desc&with_genres=16,12`
  } else {
    urlQueryString = `sort_by=popularity.desc`
  }


  useEffect(() => {

    const value = {category:'discover', type:'movie', queryString:`${urlQueryString}&include_adult=false&page=${pageNo}`}
    sendRequest(value, true)
    setIsLoading(true)
   }, [pageNo,urlQuery,sendRequest,urlQueryString])

   useEffect(()=> {
    if(data) {
      console.log(data)
      setTotalPages(data.totalPages)
      setIsLoading(false)
      setMovieNames((prevMovies) => {return ([...prevMovies, ...data.results])})
    }
   },[data])

   const lastMovieRef = useCallback((node)=>{
    if(status !== 'completed'){return}
    if(observer.current) {observer.current.disconnect()}
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && totalPages !== pageNo){
        setPageNo(prevPage => prevPage+1)
      }
    })
    if(node) observer.current.observe(node)
  },[status,pageNo,totalPages])


  if(status === 'completed' && error) {
    return <>
      <h3>An error occured</h3>
      <h5>Error code is {error}</h5>
    </>
  }

  return (
    <>
      {movieNames.length > 0 && (
        <div className="container">
          <div className="row">
            { (
              movieNames.map((each, index) => {

                if(movieNames.length === index + 1) {
                  return (
                    <div ref={lastMovieRef} key={each.id} className="col-md-3 margin-top-quarter margin-bottom-quarter list-last-elm">
                      <div className={classes['movie-each']}>
                        <div className={classes['movie-each--img-wrapper']}>
                        <img src={each.poster_path ?`${IMAGE_URL}w300_and_h450_bestv2${each.poster_path}` : DummyPerson} alt={each.name} />
                        </div>
                        <div className={classes['movie-each-title-wrapper']}>
                          <NavLink to={`/movies/${each.id}`} className="text-uppercase">{each.original_title}</NavLink>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={each.id} className="col-md-3 margin-top-quarter margin-bottom-quarter list-last-elm">
                      <div className={classes['movie-each']}>
                        <div className={classes['movie-each--img-wrapper']}>
                        <img src={each.poster_path ?`${IMAGE_URL}w300_and_h450_bestv2${each.poster_path}` : DummyPerson} alt={each.name} />
                        </div>
                        <div className={classes['movie-each-title-wrapper']}>
                          <NavLink to={`/movies/${each.id}`} className="text-uppercase">{each.original_title}</NavLink>
                        </div>
                      </div>
                    </div>
                )
              })
              
            )}
          </div>
          {isLoading && (
                <p>Loading</p>
          )}
        </div>
      )}
    </>
  )
}

export default Movies