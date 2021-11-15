const TitleText = (props) => {

  return (
    <>
      <h1 className={`title-text ${props.classes}`}>
        {props.children}
      </h1>
    </>
  )
}

export default TitleText