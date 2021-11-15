
export const Cols = (props) => {

  return (
    <>
      <div className={props.classList}>
        {props.children}
      </div>
    </>
  )
}



const Layout = (props) => {
  return (
    <>
      <div className={`${props.containerType}`}>
        <div className="row">
          {props.children}
        </div>
      </div>
    </>
  )
} 

export default Layout