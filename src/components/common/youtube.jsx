const Youtube = (props) => {

  return (
    <>
    <iframe
      width="100%"
      height="320px"
      src={`https://www.youtube.com/embed/${props.videoId}`}
      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${props.videoId}?autoplay=1><img src=https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg alt=${props.name}><span>▶</span></a>`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={`${props.name}`}>
    </iframe>
    </>
  )
}

export default Youtube
