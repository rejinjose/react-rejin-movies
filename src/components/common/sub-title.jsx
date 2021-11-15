const SubTitleText = (props) => {

  return (
    <>
      <h3 className={`subtitle-text ${props.classes}`}>
        {props.children}
      </h3>
    </>
  )
}

export default SubTitleText