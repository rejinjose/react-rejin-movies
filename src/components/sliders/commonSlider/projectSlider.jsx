import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const ProjectSlider = (props) => {

  const propsData = props.data

  const splideOptions = {
    type: props.type || 'slide',
    autoplay: props.autoplay || false,
    interval: props.interval || 5000,
    speed: props.speed || 400,
    rewind: props.rewind || false,
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
      <Splide id="project-splide" className={`project-splide ${props.classes}`}  
        options={ splideOptions }
      >
        {propsData.map((each) => {
          return (
            <SplideSlide key={each.id}>
              {each.html}
            </SplideSlide>
          )
        })}
      </Splide>
    </>
  )
}

export default ProjectSlider