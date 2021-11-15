import { useState, useEffect } from 'react'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-video.css'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'
import useHttp from '../../hooks/use-http'
import {getTMDBDataEach} from '../../lib/tmdbapi'

const ImageGallerySingle = (props) =>{
  const [videoID, setVideoID] = useState(props.gallerySlideData.id)
  const {sendRequest, status, data, error} = useHttp(getTMDBDataEach, true)

  useEffect(() => {
     if(videoID) {
      sendRequest({category:'movie', id:`${videoID}`,type:'videos',queryString:'language=en-US&page=1' }, true)
    }
  },[videoID,sendRequest])
  

  
  let OfficialVideoKey = ''
  if(status === 'completed' && data) {
    let OfficalTrialer = data.results.find((value) => {
      return value.name === 'Official Trailer'
    })
    
    if(OfficalTrialer) {
      OfficialVideoKey = OfficalTrialer.key
    }else if (data.results) {
      OfficialVideoKey = data.results[0].key
    } else {
      OfficialVideoKey = ''
    }
  }


  return (
    <>
    {(status === 'pending') && (
      <p>Loading Video</p>
    )}
    {(status === 'completed' && error && (
      <p>Couldn't Load Video. Kindly try after sometime</p>
    ))}
    {(status === 'completed' && data && (
      <LightGallery
        speed={500}
        addClass= {props.galleryClass || 'MovieLightGallery'}
        plugins={[lgVideo,lgZoom]}
        autoplayFirstVideo= {false}
        youTubePlayerParams={{
          modestbranding : 1,
          showinfo : 0,
          controls : 1,
        }}
      >
        <div data-src={`//www.youtube.com/watch?v=${OfficialVideoKey}&mute=0`}
          data-sub-html={`<h4>${props.gallerySlideData && props.gallerySlideData.title}</h4><p>${props.gallerySlideData && props.gallerySlideData.subTitle}</p>`}
        >
            <span className={`btn-style-one`}>Watch Video</span>
        </div>

      </LightGallery>
    ))}
      
    </>
  )
}

export default ImageGallerySingle