import {useEffect} from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import useHttp from '../../hooks/use-http';
import {getTMDBData} from '../../lib/tmdbapi'
import { NavLink } from 'react-router-dom';
import classes from './bannerSlider.module.scss'
import './bannerSliderStyles.scss';
import preloader from '../../images/preloader/walk.gif'
import ImageGallerySingle from '../gallery/imageGallerySingle'

const IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL


const BannerSlider = (props) => {
  const {sendRequest, status, data, error} = useHttp(getTMDBData, true)

  useEffect(() => {
    sendRequest({category:'movie', type:'popular', queryString:'language=en-US&page=1'})
  },[sendRequest])

  let slideData;
  if(status === 'completed' && error === null) {
    slideData = data.results.slice(0,5)
  }

  const splideOptions = {
    type: props.type || 'slide',
    autoplay: props.autoplay || false,
    interval: props.interval || 5000,
    speed: props.speed || 400,
    rewind: props.rewind || true,
    rewindSpeed: props.rewindSpeed || 300,
    pauseOnHover: props.pauseOnHover || false,
    pauseOnFocus: props.pauseOnFocus || false,
    resetProgress: props.resetProgress || false,
    width: props.width || '100%',
    height: props.height || '100vh',
    fixedWidth : props.fixedWidth || '100%',
    fixedHeight: props.fixedHeight || '100vh',
    gap: props.gap || '50px',
    start: props.start || 0,
    perPage: props.perPage || 1,
    perMove: props.perMove || 1,
    padding: props.padding || { left: '50px', right: '50px' },
    arrows: props.arrows || false,
    pagination: props.pagination || false,
    easing: props.easing || 'cubic-bezier(0.25, 1, 0.5, 1)',
    drag: props.drag || false,
    keyboard: props.keyboard || false,
    wheel: props.wheel || false,
    direction: props.direction || 'ltr',
    breakpoints: {
      480: props.BreakPoint480 || {
        perPage: 1,
      },
      999: props.BreakPoint999 || {
        perPage: 1
      }
    },
    classes: {
      // Add classes for arrows.
      arrows: 'splide__arrows',
      arrow : 'splide__arrow ',
      prev  : 'splide__arrow--prev banner-slider-arrow-prev',
      next  : 'splide__arrow--next banner-slider-arrow-next',
  
      // Add classes for pagination.
      pagination: 'splide__pagination', // container
      page      : 'splide__pagination__page', // each button
    },
  }

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

      {status === 'completed' && error === null && (
        
        <Splide id="banner-splide" className="banner-splide"  
          options={ splideOptions }
        >
          {
          slideData.map((each) => {
            return (
              <SplideSlide key={each.id}>
                <div className={classes['banner-slide-wrapper']}>
                  <div className={classes['background-img-wrapper']}>
                    <img src={`${IMAGE_URL}w1920_and_h800_multi_faces${each.backdrop_path}`} alt={`${each.title}`} />
                  </div>
                  <div className={classes['content-wrapper']}>
                    <div className={classes['content-wrapper-main']}>
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <h2>{each.original_title}</h2>
                            <p>{each.overview}</p>
                            <div className={classes['buttons']}>
                              <div className={classes['buttons--one']}>
                                <ImageGallerySingle galleryClass="banner-slider-gallery" gallerySlideData={{title: each.original_title, subTitle: each.overview, id: each.id}}/>  
                              </div>  
                              <div className={classes['buttons-two']}>
                              <NavLink to={`/movies/${each.id}`} className="text-uppercase white white-hover btn-style-one" >Details</NavLink>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={classes['portrait-image-wrap']}>
                            <img src={`${IMAGE_URL}w600_and_h900_bestv2${each.poster_path}`} alt={`${each.title}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </SplideSlide>
            )
          })
          }
        </Splide>
      )}
    </>
  )
}

export default BannerSlider