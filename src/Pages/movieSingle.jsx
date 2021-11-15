import { useEffect } from "react"
import { useParams,NavLink,useLocation } from "react-router-dom"
import useHttp from "../hooks/use-http"
import { getTMDBGetDetails } from '../lib/tmdbapi'
import InnerPageBanner from '../components/banners/innerPageBanner'
import Layout, {Cols} from '../components/layout/layout'
import TitleText from '../components/common/title-text'
import ProjectSlider from '../components/sliders/commonSlider/projectSlider'
import Youtube from '../components/common/youtube'
import classes from './movieSingle.module.scss'
import preloader from '../images/preloader/walk.gif'
import DummyPerson from '../images/common/dummy.jpg'

const IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL

const listingSliderHelperFn = (value) => {
  return value.map((each) => {
    return  {
      id: each.id,
      html: <div className="itemEach">
              <div className="itemImage">
                <img src={each.poster_path ?`${IMAGE_URL}w300_and_h450_bestv2${each.poster_path}` : DummyPerson} alt={each.name} />
              </div>
              <div className="itemDetails">
                <NavLink to={`/movies/${each.id}`} className="text-uppercase">{each.title}</NavLink>
              </div>
            </div>  
    }
  })
}  

const onTop = () => {
  window.scrollTo(0, 0);
}

const MovieSingle = () => {
  const params = useParams()
  const movieID = params.movieID
  
  const routePath = useLocation();
  useEffect(() => {
    onTop()
  }, [routePath]);

  const {sendRequest, data, error, status} = useHttp(getTMDBGetDetails, true)

  useEffect(()=> {
    sendRequest({category:'movie', id:`${movieID}`, queryString: 'language=en-US', append_to_response:'videos,images,credits,similar'})
  },[sendRequest,movieID])

  let similarMoviesObj = false       
  let videos
  if(status === 'completed' && error === null && data) {
    const similarMovies = data.similar.results
    similarMoviesObj = listingSliderHelperFn(similarMovies)
    videos = data.videos.results
  }
  console.log(videos)

  return (
    <>

      {status === 'completed' && error !== null && (
        <h4 className={classes.errorMsg}>
          {error}
        </h4>  
      )}

      {status === 'pending' && error === null && 
        <div className={classes.loadingData}>
          <img src={preloader} alt="Loader" />
        </div>
      }

      {status === 'completed' && error === null && 
        <div className="single-page-first-fold">
        <Layout containerType="container-fluid">
          <Cols classList="col-md-12 no-padding">
            {data !== null && 
            (<>
            <InnerPageBanner data={{bgImg:  data.backdrop_path, posterImg: data.poster_path, title: data.original_title, subtitle: data.overview, genre: data.genres, cast: data.credits.cast}}/>

              {similarMoviesObj.length > 0 &&(
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                  <TitleText classes="black uppercase font-weight-300 margin-top-full margin-bottom-20">
                    Similar Movies
                  </TitleText>
                  <div className='default-listing-slider-wrap'>
                    <ProjectSlider classes="default-listing-slider" data={similarMoviesObj} type="slide" autoplay={false} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="25px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true} fixedWidth='14%' fixedHeight='auto' />
                  </div>

                  </div>
                </div>
              </div>
            )}

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {videos && (
                      <TitleText classes="black uppercase font-weight-300 margin-top-full margin-bottom-20">
                        Youtube Videos
                      </TitleText>
                    )}
                  </div>
                  {videos && (
                    videos.map((each) => {
                      return (
                        <div key={each.id} className="col-md-6">
                          <div className="youtube-video-wrapper margin-top-quarter">
                          <Youtube videoId = {each.key} name = {each.name} />
                          </div>
                        </div>
                      )
                    })
                  )}

                  
                </div>
              </div>

            </>)
            }
          </Cols>
        </Layout>
        </div>
      }

    </>
  )
}

export default MovieSingle