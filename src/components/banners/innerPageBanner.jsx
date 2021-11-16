import { useRef,useEffect } from 'react'
import TitleText from '../common/title-text'
import SubtitleText from '../common/sub-title'
import classes from './innerPageBanner.module.scss'
import './innerPageBannerstyles.scss'
import ProjectSlider from '../sliders/commonSlider/projectSlider'
import DummyPerson from '../../images/common/dummy.jpg'

const IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL

const InnerPageBanner = (props) =>{

  const castSliderRef = useRef()

  const mainActingCast = props.data.cast.filter((each) => {
    return  (each.known_for_department = 'Acting' && each.popularity > 1)
  })

  const CharacterDataObj = mainActingCast.map((each) => {
    return  {
      id: each.id,
      html: <div className="characterEach">
              <div className="characterImage">
                <img src={each.profile_path ? `${IMAGE_URL}w300_and_h450_bestv2${each.profile_path}` : DummyPerson} alt={each.name} />
              </div>
              <div className="characterDetails">
                <h2>{each.name}</h2>
              </div>
            </div>  
    }
  })

useEffect(()=>{
  if(CharacterDataObj.length > 0 && CharacterDataObj !== 'undefined') {
    const castSliderItem = castSliderRef.current
    setTimeout(()=> {
      const ulItem = castSliderItem.querySelector('.splide__list')
      let totalHt = 0

      for (let value of ulItem.querySelectorAll('li')) {
          let itemEachHt = value.querySelector('.characterDetails').offsetHeight
          if(itemEachHt > totalHt) {
          totalHt = itemEachHt
        }
      }
      
      for (let value of ulItem.querySelectorAll('li')) {
        value.querySelector('.characterDetails').style.height = `${totalHt}px` 
      }
    },100)
  }  
},[CharacterDataObj]) 

  return (
    <>
    <div className={`padding-top-full padding-bottom-full ${classes['bannerWrapper'] }`}>
      <div className={classes['bannerWrapper-imgcontainer']}>
        {/* <img src={`${IMAGE_URL}w1920_and_h800_multi_faces${props.data.bgImg}`} alt=
        {props.data.title} /> */}
        <img src={`${IMAGE_URL}w1280${props.data.bgImg}`} alt={props.data.title} />
      </div>
      <div className={classes['bannerWrapper-contentcontainer']}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            <div className={classes['portrait-image-wrap']}>
              <img src={`${IMAGE_URL}w600_and_h900_bestv2${props.data.posterImg}`} alt={props.data.title} />
            </div>
            </div>
            <div className="col-md-8">
              <TitleText classes="white uppercase font-weight-300 margin-bottom-10">
                {props.data.title}
              </TitleText>
              <SubtitleText classes="white uppercase font-weight-500 margin-bottom-quarter">
                {props.data.subtitle}
              </SubtitleText>
              <ul className={classes.genreList}>
                {props.data.genre.map((each) => {
                  return (
                    <li className="white" key={each.id}>{each.name}</li>
                  )
                })} 
              </ul>
              {CharacterDataObj.length > 0 && CharacterDataObj !== 'undefined' && (
                <div className='cast-slider-wrap margin-top-half' ref={castSliderRef}>
                  {<ProjectSlider classes="casting-slider" data={CharacterDataObj} type="slide" autoplay={false} pauseOnHover={true} pauseOnFocus={true} resetProgress={true} gap="25px" padding={{left: '0px', right: '0px'}} arrows={true} pagination={false} drag={true} keyboard={true} wheel={true} fixedWidth='24%' fixedHeight='auto' />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default InnerPageBanner