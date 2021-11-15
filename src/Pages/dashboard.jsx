import ChangePassword from '../components/Forms/changePassword'

const Dashboard = () => {
  return (
    <>
    <div className="page-section">
      <div className="container">

        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center margin-top-full title-text text-uppercase">This is the Dashboard Page</h1>
            <p className="text-center subtitle-text"><span>This page can only be seen once you login to the system</span></p>
          </div>
        </div>

        <div className="row">
          <div className="offset-md-3 col-md-6">
            <h2 className="padding-top-100">To change the Password: </h2>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard