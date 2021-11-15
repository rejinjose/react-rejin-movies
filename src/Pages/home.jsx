import { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import useHttp from '../hooks/use-http'
import {getTMDBData} from '../lib/tmdbapi'
import Layout, {Cols} from '../components/layout/layout'
import BannerSlider from '../components/sliders/bannerSlider'
import TitleText from '../components/common/title-text'
import ProjectSlider from '../components/sliders/commonSlider/projectSlider'

const IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL

const listingSliderHelperFn = (value) => {
  return value.map((each) => {
    return  {
      id: each.id,
      html: <div className="itemEach">
              <div className="itemImage">
                <img src={`${IMAGE_URL}w300_and_h450_bestv2${each.poster_path}`} alt={each.name} />
              </div>
              <div className="itemDetails">
                <NavLink to={`/movies/${each.id}`} className="text-uppercase">{each.title}</NavLink>
              </div>
            </div>  
    }
  })
}  

const Home = ()=> {

  const {sendRequest:ratedRRequest, data: ratedRData, error: ratedRError, status:ratedRStatus} = useHttp(getTMDBData, true)

  const {sendRequest:mostPopularRequest, data: mostPopularData, error: mostPopularError, status:mostPopularStatus} = useHttp(getTMDBData, true)

  const {sendRequest:bestmoviesfrom2010Request, data: bestmoviesfrom2010Data, error: bestmoviesfrom2010Error, status:bestmoviesfrom2010Status} = useHttp(getTMDBData, true)

  useEffect(()=>{
    ratedRRequest({category:'discover', type:'movie', queryString:'sort_by=popularity.desc'})
  },[ratedRRequest])

  useEffect(()=>{
    mostPopularRequest({category:'discover', type:'movie', queryString:'certification_country=US&certification=R&sort_by=vote_average.desc'})
  },[mostPopularRequest])

  useEffect(()=>{
    bestmoviesfrom2010Request({category:'discover', type:'movie', queryString:'primary_release_year=2018&sort_by=vote_average.desc&with_genres=16,12'})
  },[bestmoviesfrom2010Request])
  

  let ratedRMoviesObj = false       
  
  if(ratedRStatus === 'completed' && ratedRError === null && ratedRData) {
    const ratedRMovies = ratedRData.results
    ratedRMoviesObj = listingSliderHelperFn(ratedRMovies)
  }

  let mostPopularMoviesObj = false       
  
  if(mostPopularStatus === 'completed' && mostPopularError === null && mostPopularData) {
    const mostPopularMovies = mostPopularData.results
    mostPopularMoviesObj = listingSliderHelperFn(mostPopularMovies)
  }

  let bestmoviesfrom2010MoviesObj = false       
  
  if(bestmoviesfrom2010Status === 'completed' && bestmoviesfrom2010Error === null && bestmoviesfrom2010Data) {
    const bestmoviesfrom2010Movies = bestmoviesfrom2010Data.results
    bestmoviesfrom2010MoviesObj = listingSliderHelperFn(bestmoviesfrom2010Movies)
  }

  return (
    <>
    <div className="page-section">
      
      <Layout containerType="container-fluid">
        <Cols classList="col-md-12 no-padding">
          <BannerSlider type="slide" autoplay={true} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="0px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true}/>
        </Cols>
      </Layout>

      {ratedRStatus === 'completed' && ratedRError === null && (
        <Layout containerType="container">
          <Cols classList="col-md-12">
            <TitleText classes="black uppercase font-weight-300 margin-top-half margin-bottom-20">
              Higest Rated R Movies
            </TitleText>
            <NavLink to={`/movies?q=ratedRrequest`} className="text-uppercase view-all-movies-btn">View All Highest Rated Movies</NavLink>
            {ratedRData && (
              <div className='default-listing-slider-wrap'>
                <ProjectSlider classes="default-listing-slider" data={ratedRMoviesObj} type="slide" autoplay={false} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="25px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true} fixedWidth='14%' fixedHeight='auto' />
              </div>
            )}
          </Cols>
        </Layout>
      )}

      {mostPopularStatus === 'completed' && mostPopularError === null && (
        <Layout containerType="container">
          <Cols classList="col-md-12">
            <TitleText classes="black uppercase font-weight-300 margin-top-half margin-bottom-20">
              Most Popular Movies
            </TitleText>
            <NavLink to={`/movies?q=mostPopularRequest`} className="text-uppercase view-all-movies-btn">View All Most Popular Movies</NavLink>
            {mostPopularData && (
              <div className='default-listing-slider-wrap'>
                <ProjectSlider classes="default-listing-slider" data={mostPopularMoviesObj} type="slide" autoplay={false} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="25px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true} fixedWidth='14%' fixedHeight='auto' />
              </div>
            )}
          </Cols>
        </Layout>
      )}      

      {bestmoviesfrom2010Status === 'completed' && bestmoviesfrom2010Error === null && (
        <Layout containerType="container">
          <Cols classList="col-md-12">
            <TitleText classes="black uppercase font-weight-300 margin-top-half margin-bottom-20">
              Best Movies from 2018 - Animated
            </TitleText>
            <NavLink to={`/movies?q=bestmoviesfrom2010`} className="text-uppercase view-all-movies-btn">View All Best Movies from 2018</NavLink>
            {bestmoviesfrom2010Data && (
              <div className='default-listing-slider-wrap'>
                <ProjectSlider classes="default-listing-slider" data={bestmoviesfrom2010MoviesObj} type="slide" autoplay={false} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="25px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true} fixedWidth='14%' fixedHeight='auto' />
              </div>
            )}
          </Cols>
        </Layout>
      )}  

    </div>
    </>
  )
}

export default Home