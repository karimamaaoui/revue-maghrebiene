import React from 'react'
import ErrorMessage from '../../Authentification/ErrorMessage'
import Loading from '../../Authentification/Loading'

export default function UpdateUser() {
  return (
    <div>
        <div>

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body">
                    <div className="row gutters-sm">
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>

                            <h3 className="fieldset-title">Personal Info</h3>
                            <div class="card" >
                                {loading && <Loading />}
                                {success && (
                                    <ErrorMessage variant="success">
                                        Updated Successfully
                                    </ErrorMessage>
                                )}
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

                                <div class="card-body">
                                    <form onSubmit={submitHandler}>
                                    <div className="form-group avatar">
                                        <figure className="figure col-md-2">
                                            <img className="img-rounded img-responsive"
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                        </figure>
                                        
                                        <div class="col-sm-12 text-secondary">

                                            <input type="file" className="file-uploader "
                                                onChange={(e) => postDetails(e.target.files[0])}
                                            />
                                            <button type="submit" className="btn btn-primary" onClick={addPictureHandler}>Upload</button>
                                        </div>
                                    </div>
                                  
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Username</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                        </div>


                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">First Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Last Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="email" className="form-control" value={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">placeofpractice</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={placeofpractice}
                                                    onChange={(e) => setPlaceOfPractice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">University</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={university}
                                                    onChange={(e) => setUniversity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Password</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="password" className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input className="btn btn-primary" type="submit" value="Update Profile" />
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    </div>
  )
}
