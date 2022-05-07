import React, { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { RiHomeLine, RiFileCopyLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import './sidebar.css'
export default function Sidebar() {
  return (
    <>
    
<div class="container">
    <div class="row">
        <div class="col-md-4 static">
            <div class="profile-card">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" class="profile-photo"/>
            	<h5><a href="#" class="text-white">Sarah Cruiz</a></h5>
            	<a href="#" class="text-white"><i class="fa fa-user"></i> 1,299 followers</a>
            </div>
            <ul class="nav-news-feed">
              <li><i class="fa fa-list-alt icon1"></i><div><a href="#">My Newsfeed</a></div></li>
              <li><i class="fa fa-users icon2"></i><div><a href="#">People Nearby</a></div></li>
              <li><i class="fa fa-user icon3"></i><div><a href="#">Friends</a></div></li>
              <li><i class="fa fa-comments icon4"></i><div><a href="#">Messages</a></div></li>
              <li><i class="fa fa-picture-o icon5"></i><div><a href="#">Images</a></div></li>
              <li><i class="fa fa-video-camera icon6"></i><div><a href="#">Videos</a></div></li>
            </ul>
            <div id="chat-block">
              <div class="title">Chat online</div>
              <ul class="online-users list-inline">
                <li><a href="#" title="Linda Lohan"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Sophia Lee"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="John Doe"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Alexis Clark"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="James Carter"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Robert Cook"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Richard Bell"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Anna Young"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
                <li><a href="#" title="Julia Cox"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" class="img-responsive profile-photo"/><span class="online-dot"></span></a></li>
              </ul>
            </div>
        </div>
	</div>
</div>







    <div class="layout-content">

<div class="container flex-grow-1 container-p-y">

  <div class="container-m-nx container-m-ny theme-bg-white mb-4">
    <div class="media col-md-10 col-lg-8 col-xl-7 py-5 mx-auto">
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="d-block ui-w-100 rounded-circle"/>
      <div class="media-body ml-5">
        <h4 class="font-weight-bold mb-4">Nellie Maxwell</h4>

        <div class="text-muted mb-4">
          Lorem ipsum dolor sit amet, nibh suavitate qualisque ut nam. Ad harum primis electram duo, porro principes ei has.
        </div>

        <a href="javascript:void(0)" class="d-inline-block text-body">
          <strong>234</strong>
          <span class="text-muted">followers</span>
        </a>
        <a href="javascript:void(0)" class="d-inline-block text-body ml-3">
          <strong>111</strong>
          <span class="text-muted">following</span>
        </a>
      </div>
    </div>
    <hr class="m-0"/>
  </div>

  <div class="row">
    <div class="col">

      <div class="card mb-4">
        <div class="card-body">

          <div class="row mb-2">
            <div class="col-md-3 text-muted">Birthday:</div>
            <div class="col-md-9">
              May 3, 1995
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-3 text-muted">Country:</div>
            <div class="col-md-9">
              <a href="javascript:void(0)" class="text-body">Canada</a>
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-3 text-muted">Languages:</div>
            <div class="col-md-9">
              <a href="javascript:void(0)" class="text-body">English</a>
            </div>
          </div>

          <h6 class="my-3">Contacts</h6>

          <div class="row mb-2">
            <div class="col-md-3 text-muted">Phone:</div>
            <div class="col-md-9">
              +0 (123) 456 7891
            </div>
          </div>

          <h6 class="my-3">Interests</h6>

          <div class="row mb-2">
            <div class="col-md-3 text-muted">Favorite music:</div>
            <div class="col-md-9">
              <a href="javascript:void(0)" class="text-body">Rock</a>,
              <a href="javascript:void(0)" class="text-body">Alternative</a>,
              <a href="javascript:void(0)" class="text-body">Electro</a>,
              <a href="javascript:void(0)" class="text-body">Drum &amp; Bass</a>,
              <a href="javascript:void(0)" class="text-body">Dance</a>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 text-muted">Favorite movies:</div>
            <div class="col-md-9">
              <a href="javascript:void(0)" class="text-body">The Green Mile</a>,
              <a href="javascript:void(0)" class="text-body">Pulp Fiction</a>,
              <a href="javascript:void(0)" class="text-body">Back to the Future</a>,
              <a href="javascript:void(0)" class="text-body">WALL·E</a>,
              <a href="javascript:void(0)" class="text-body">Django Unchained</a>,
              <a href="javascript:void(0)" class="text-body">The Truman Show</a>,
              <a href="javascript:void(0)" class="text-body">Home Alone</a>,
              <a href="javascript:void(0)" class="text-body">Seven Pounds</a>
            </div>
          </div>

        </div>
        <div class="card-footer text-center p-0">
          <div class="row no-gutters row-bordered row-border-light">
            <a href="javascript:void(0)" class="d-flex col flex-column text-body py-3">
              <div class="font-weight-bold">24</div>
              <div class="text-muted small">posts</div>
            </a>
            <a href="javascript:void(0)" class="d-flex col flex-column text-body py-3">
              <div class="font-weight-bold">51</div>
              <div class="text-muted small">videos</div>
            </a>
            <a href="javascript:void(0)" class="d-flex col flex-column text-body py-3">
              <div class="font-weight-bold">215</div>
              <div class="text-muted small">photos</div>
            </a>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <p>
            Aliquam varius euismod lectus, vel consectetur nibh tincidunt vitae. In non dignissim est. Sed eu ligula metus. Vivamus eget quam sit amet risus venenatis laoreet ut vel magna. Sed dui ligula, tincidunt in nunc eu, rhoncus iaculis nisi.
          </p>
          <p>
            Sed et convallis odio, vel laoreet tellus. Vivamus a leo eu metus porta pulvinar. Pellentesque tristique varius rutrum.
          </p>
          <div class="ui-bordered">
            <a href="javascript:void(0)" class="ui-rect ui-bg-cover text-white" style={{backgroundColor:"greenyellow"}}>
              <div class="d-flex justify-content-start align-items-end ui-rect-content p-2">
                <div class="bg-dark rounded text-white small py-1 px-2">
                  <i class="ion ion-md-link"></i> &nbsp; external.com/some/page
                </div>
              </div>
            </a>
            <div class="p-4">
              <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h5>
              Duis ut quam nec mi bibendum finibus et id tortor. Maecenas tristique dolor enim, sed tristique sem cursus et. Etiam tempus iaculis blandit. Vivamus a justo a elit bibendum pulvinar ut non erat. Cras in purus sed leo mattis consequat viverra id arcu.
            </div>
          </div>
        </div>
        <div class="card-footer">
          <a href="javascript:void(0)" class="d-inline-block text-muted">
            <small class="align-middle">
              <strong>123</strong> Likes</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <small class="align-middle">
              <strong>12</strong> Comments</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <i class="ion ion-md-share align-middle"></i>&nbsp;
            <small class="align-middle">Repost</small>
          </a>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus commodo bibendum. Vivamus laoreet blandit odio, vel finibus quam dictum ut.
          </p>
          <a href="javascript:void(0)" class="ui-rect ui-bg-cover" style={{backgroundColor: "greenyellow"}}></a>
        </div>
        <div class="card-footer">
          <a href="javascript:void(0)" class="d-inline-block text-muted">
            <small class="align-middle">
              <strong>123</strong> Likes</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <small class="align-middle">
              <strong>12</strong> Comments</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <i class="ion ion-md-share align-middle"></i>&nbsp;
            <small class="align-middle">Repost</small>
          </a>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <p>
            Aliquam viverra ornare tincidunt. Vestibulum sit amet vestibulum quam. Donec eu est non velit rhoncus interdum eget vel lorem.
          </p>

          <div class="border-top-0 border-right-0 border-bottom-0 ui-bordered pl-3 mt-4 mb-2">
            <div class="media mb-3">
              <img src="https://bootdey.com/img/Content/avatar/avatar4.png" class="d-block ui-w-40 rounded-circle" alt=""/>
              <div class="media-body ml-3">
                Kenneth Frazier
                <div class="text-muted small">3 days ago</div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus commodo bibendum. Vivamus laoreet blandit odio, vel finibus quam dictum ut.
            </p>
            <a href="javascript:void(0)" class="ui-rect ui-bg-cover" style={{backgroundColor:"greenyellow"}}></a>
          </div>
          <a href="javascript:void(0)" class="text-muted small">Reposted from @kfrazier/posts/123</a>
        </div>
        <div class="card-footer">
          <a href="javascript:void(0)" class="d-inline-block text-muted">
            <small class="align-middle">
              <strong>123</strong> Likes</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <small class="align-middle">
              <strong>12</strong> Comments</small>
          </a>
          <a href="javascript:void(0)" class="d-inline-block text-muted ml-3">
            <i class="ion ion-md-share align-middle"></i>&nbsp;
            <small class="align-middle">Repost</small>
          </a>
        </div>
      </div>


    </div>
    <div class="col-xl-4">

      <div class="card mb-4">
        <div class="card-body">
          <a href="javascript:void(0)" class="btn btn-primary rounded-pill">+&nbsp; Follow</a>
          &nbsp;
          <a href="javascript:void(0)" class="btn icon-btn btn-default md-btn-flat rounded-pill">
            <span class="ion ion-md-mail"></span>
          </a>
        </div>
        <hr class="border-light m-0"/>
        <div class="card-body">
          <p class="mb-2">
            <i class="ion ion-md-desktop ui-w-30 text-center text-lighter"></i> UI/UX Designer</p>
          <p class="mb-2">
            <i class="ion ion-ios-navigate ui-w-30 text-center text-lighter"></i> London, United Kingdom</p>
          <p class="mb-0">
            <i class="ion ion-md-globe ui-w-30 text-center text-lighter"></i>
            <a href="javascript:void(0)" class="text-body">website.com</a>
          </p>
        </div>
        <hr class="border-light m-0"/>
        <div class="card-body">
          <a href="javascript:void(0)" class="d-block text-body mb-2">
            <i class="ion ion-logo-twitter ui-w-30 text-center text-twitter"></i> @nmaxwell
          </a>
          <a href="javascript:void(0)" class="d-block text-body mb-2">
            <i class="ion ion-logo-facebook ui-w-30 text-center text-facebook"></i> nmaxwell
          </a>
          <a href="javascript:void(0)" class="d-block text-body mb-0">
            <i class="ion ion-logo-instagram ui-w-30 text-center text-instagram"></i> nmaxwell
          </a>
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-header">Skills</div>
        <div class="card-body">

          <div class="mb-1">HTML - <small class="text-muted">80%</small></div>
          <div class="progress mb-3" style={{height: "4px"}}>
            <div class="progress-bar bg-secondary" style={{width:" 80%;"}}></div>
          </div>

          <div class="mb-1">CSS - <small class="text-muted">95%</small></div>
          <div class="progress mb-3" style={{height:" 4px"}}>
            <div class="progress-bar bg-success" style={{width: "95%"}}></div>
          </div>

          <div class="mb-1">Javascript - <small class="text-muted">90%</small></div>
          <div class="progress mb-3" style={{height: "4px;"}}>
            <div class="progress-bar bg-warning" style={{width: "90%"}}></div>
          </div>

          <div class="mb-1">UI/UX - <small class="text-muted">80%</small></div>
          <div class="progress" style={{height: "4px;"}}>
            <div class="progress-bar bg-danger" style={{width: "80%;"}}></div>
          </div>

        </div>
        <a href="javascript:void(0)" class="card-footer d-block text-center text-body small font-weight-semibold">SHOW ALL SKILLS</a>
      </div>

      <div class="card mb-4">
        <div class="card-header with-elements">
          <span class="card-header-title">Friends &nbsp;
            <small class="text-muted">591</small>
          </span>
          <div class="card-header-elements ml-md-auto">
            <a href="javascript:void(0)" class="btn btn-default md-btn-flat btn-xs">Show All</a>
          </div>
        </div>
        <div class="row no-gutters row-bordered row-border-light">
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Leon Wilson</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Allie Rodriguez</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Kenneth Frazier</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Nellie Maxwell</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Mae Gibson</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Alice Hampton</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Belle Ross</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Arthur Duncan</div>
          </a>
          <a href="javascript:void(0)" class="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar9.png" alt="" class="d-block ui-w-40 rounded-circle mb-2"/>
            <div class="text-center small">Amanda Warner</div>
          </a>
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-header with-elements">
          <span class="card-header-title">Photos</span>
          <div class="card-header-elements ml-2">
            <small class="text-muted">54</small>
          </div>
          <div class="card-header-elements ml-md-auto">
            <a href="javascript:void(0)" class="btn btn-default md-btn-flat btn-xs">Show More</a>
          </div>
        </div>
        <div class="row no-gutters align-items-start pt-1 pl-1">

          <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
            <span class="d-block ui-square ui-bg-cover" style={{backgroundColor: "greenyellow"}}></span>
          </a>
          <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
            <span class="d-block ui-square ui-bg-cover" style={{backgroundImage: "greenyellow"}}></span>
          </a>
          <a href="javascript:void(0)" class="d-block col-3 col-sm-2 col-lg-3 pr-1 pb-1">
            <span class="d-block ui-square ui-bg-cover" style={{backgroundImage: "greenyellow"}}></span>
          </a>

        </div>
      </div>

    </div>
  </div>

</div>

<nav class="layout-footer footer bg-footer-theme">
  <div class="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
    <div class="pt-3">
      <span class="footer-text font-weight-bolder">Appwork</span> ©
    </div>
    <div>
      <a href="javascript:void(0)" class="footer-link pt-3">About Us</a>
      <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Help</a>
      <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Contact</a>
      <a href="javascript:void(0)" class="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
    </div>
  </div>
</nav>

</div>
<div class="container">
    <div class="profile">
        <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
                <div class="profile-header-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <ul class="profile-header-tab nav nav-tabs nav-tabs-v2">
                    <li class="nav-item">
                        <a href="#profile-post" class="nav-link" data-toggle="tab">
                            <div class="nav-field">Posts</div>
                            <div class="nav-value">382</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#profile-followers" class="nav-link active" data-toggle="tab">
                            <div class="nav-field">Followers</div>
                            <div class="nav-value">1.3m</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#profile-media" class="nav-link" data-toggle="tab">
                            <div class="nav-field">Photos</div>
                            <div class="nav-value">1,397</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#profile-media" class="nav-link" data-toggle="tab">
                            <div class="nav-field">Videos</div>
                            <div class="nav-value">120</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#profile-followers" class="nav-link" data-toggle="tab">
                            <div class="nav-field">Following</div>
                            <div class="nav-value">2,592</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="profile-container">
            <div class="profile-sidebar">
                <div class="desktop-sticky-top">
                    <h4>John Smith</h4>
                    <div class="font-weight-600 mb-3 text-muted mt-n2">@johnsmith</div>
                    <p>
                        Principal UXUI Design &amp; Brand Architecture for Studio. Creator of SeanTheme. Bringing the world closer together. Studied Computer Science and Psychology at Harvard University.
                    </p>
                    <div class="mb-1"><i class="fa fa-map-marker-alt fa-fw text-muted"></i> New York, NY</div>
                    <div class="mb-3"><i class="fa fa-link fa-fw text-muted"></i> seantheme.com/studio</div>
                    <hr class="mt-4 mb-4" />
                </div>
            </div>

            <div class="profile-content">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="tab-content p-0">
                            <div class="tab-pane fade active show" id="profile-followers">
                                <div class="list-group">
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Ethel Wilkes</a></div>
                                            <div class="text-muted fs-13px">North Raundspic</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Shanaya Hansen</a></div>
                                            <div class="text-muted fs-13px">North Raundspic</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">James Allman</a></div>
                                            <div class="text-muted fs-13px">North Raundspic</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Marie Welsh</a></div>
                                            <div class="text-muted fs-13px">Crencheporford</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Lamar Kirkland</a></div>
                                            <div class="text-muted fs-13px">Prince Ewoodswan</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Bentley Osborne</a></div>
                                            <div class="text-muted fs-13px">Red Suvern</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Ollie Goulding</a></div>
                                            <div class="text-muted fs-13px">Doa</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Hiba Calvert</a></div>
                                            <div class="text-muted fs-13px">Stemunds</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Rivka Redfern</a></div>
                                            <div class="text-muted fs-13px">Fallnee</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" class="text-dark font-weight-600">Roshni Fernandez</a></div>
                                            <div class="text-muted fs-13px">Mount Lerdo</div>
                                        </div>
                                        <a href="#" class="btn btn-outline-primary">Follow</a>
                                    </div>
                                </div>
                                <div class="text-center p-3">
                                    <a href="#" class="text-dark text-decoration-none">Show more <b class="caret"></b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="content">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="profile-user-box card-box bg-custom">
                    <div class="row">
                        <div class="col-sm-6"><span class="float-left mr-3">
                          <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="thumb-lg rounded-circle"/></span>
                            <div class="media-body text-white">
                                <h4 class="mt-1 mb-1 font-18">Michael A. Franklin</h4>
                                <p class="font-13 text-light">User Experience Specialist</p>
                                <p class="text-light mb-0">California, United States</p>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="text-right">
                                <button type="button" class="btn btn-light waves-effect"><i class="mdi mdi-account-settings-variant mr-1"></i> Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="card-box">
                    <h4 class="header-title mt-0">Personal Information</h4>
                    <div class="panel-body">
                        <p class="text-muted font-13">Hye, I’m Johnathan Doe residing in this beautiful world. I create websites and mobile apps with great UX and UI design. I have done work with big companies like Nokia, Google and Yahoo. Meet me or Contact me for any queries. One Extra line for filling space. Fill as many you want.</p>
                        <hr/>
                        <div class="text-left">
                            <p class="text-muted font-13"><strong>Full Name :</strong> <span class="m-l-15">Johnathan Deo</span></p>
                            <p class="text-muted font-13"><strong>Mobile :</strong><span class="m-l-15">(+12) 123 1234 567</span></p>
                            <p class="text-muted font-13"><strong>Email :</strong> <span class="m-l-15">coderthemes@gmail.com</span></p>
                            <p class="text-muted font-13"><strong>Location :</strong> <span class="m-l-15">USA</span></p>
                            <p class="text-muted font-13"><strong>Languages :</strong> <span class="m-l-5"><span class="flag-icon flag-icon-us m-r-5 m-t-0" title="us"></span> <span>English</span> </span><span class="m-l-5"><span class="flag-icon flag-icon-de m-r-5" title="de"></span> <span>German</span> </span><span class="m-l-5"><span class="flag-icon flag-icon-es m-r-5" title="es"></span> <span>Spanish</span> </span><span class="m-l-5"><span class="flag-icon flag-icon-fr m-r-5" title="fr"></span> <span>French</span></span>
                            </p>
                        </div>
                        <ul class="social-links list-inline mt-4 mb-0">
                            <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a></li>
                            <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></li>
                            <li class="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" class="tooltips" href="" data-original-title="Skype"><i class="fa fa-skype"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="card-box ribbon-box">
                    <div class="ribbon ribbon-primary">Messages</div>
                    <div class="clearfix"></div>
                    <div class="inbox-widget">
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle" alt="" /></div>
                                <p class="inbox-item-author">Tomaslau</p>
                                <p class="inbox-item-text">I've finished it! See you so...</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Stillnotdavid</p>
                                <p class="inbox-item-text">This theme is awesome!</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Kurafire</p>
                                <p class="inbox-item-text">Nice to meet you</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Shahedk</p>
                                <p class="inbox-item-text">Hey! there I'm available...</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Adhamdannaway</p>
                                <p class="inbox-item-text">This theme is awesome!</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Tomaslau</p>
                                <p class="inbox-item-text">I've finished it! See you so...</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#">
                            <div class="inbox-item">
                                <div class="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle" alt=""/></div>
                                <p class="inbox-item-author">Stillnotdavid</p>
                                <p class="inbox-item-text">This theme is awesome!</p>
                                <p class="inbox-item-date">
                                    <button type="button" class="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-layers float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Orders</h6>
                            <h2 class="" data-plugin="counterup">1,587</h2><span class="badge badge-custom">+11% </span>
                            <span class="text-muted">From previous period</span></div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-paypal float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Revenue</h6>
                            <h2 class="">$<span data-plugin="counterup">46,782</span></h2><span class="badge badge-danger">-29% </span><span class="text-muted">From previous period</span></div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card-box tilebox-one"><i class="icon-rocket float-right text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Product Sold</h6>
                            <h2 class="" data-plugin="counterup">1,890</h2><span class="badge badge-custom">+89% </span><span class="text-muted">Last year</span></div>
                    </div>
                </div>
                <div class="card-box">
                    <h4 class="header-title mt-0 mb-3">Experience</h4>
                    <div class="">
                        <div class="">
                            <h5 class="text-custom">Lead designer / Developer</h5>
                            <p class="mb-0">websitename.com</p>
                            <p><b>2010-2015</b></p>
                            <p class="text-muted font-13 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <hr/>
                        <div class="">
                            <h5 class="text-custom">Senior Graphic Designer</h5>
                            <p class="mb-0">coderthemes.com</p>
                            <p><b>2007-2009</b></p>
                            <p class="text-muted font-13 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                </div>
                <div class="card-box">
                    <h4 class="header-title mb-3">My Projects</h4>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Assign</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span class="label label-info">Work in Progress</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Adminox Frontend</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span class="label label-success">Pending</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span class="label label-pink">Done</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Adminox Frontend</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span class="label label-purple">Work in Progress</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span class="label label-warning">Coming soon</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      <div className="container">
                                
 	                                  
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-pattern">
              <div className="card-body">
                <div className="float-right">
                  <i className="fa fa-archive text-primary h4 ml-3"></i>
                </div>
                <h5 className="font-size-20 mt-0 pt-1">24</h5>
                <p className="text-muted mb-0">Total Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-pattern">
              <div className="card-body">
                <div className="float-right">
                  <i className="fa fa-th text-primary h4 ml-3"></i>
                </div>
                <h5 className="font-size-20 mt-0 pt-1">18</h5>
                <p className="text-muted mb-0">Completed Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-pattern">
              <div className="card-body">
                <div className="float-right">
                  <i className="fa fa-file text-primary h4 ml-3"></i>
                </div>
                <h5 className="font-size-20 mt-0 pt-1">06</h5>
                <p className="text-muted mb-0">Pending Projects</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group mb-0">
                    <label>Search</label>
                    <div className="input-group mb-0">
                      <input type="text" className="form-control" placeholder="Search..." aria-describedby="project-search-addon" />
                      <div className="input-group-append">
                        <button className="btn btn-danger" type="button" id="project-search-addon"><i className="fa fa-search search-icon font-12"></i></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

    <div class="row">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-credit-card f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
	</div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive project-list">
                  <table className="table project-table table-centered table-nowrap">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Projects</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Team</th>
                        <th scope="col">Progress</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>New admin Design</td>
                        <td>02/5/2019</td>
                        <td>
                          <span className="text-success font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Roger Drake">
                              <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle avatar-xs" alt="" height="15px" width="6px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reggie James">
                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Gerald Mayberry">
                              <img src="https://bootdey.com/img/Content/avatar/avatar8.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">100%</span></p>

                          <div className="progress mt-2" style={{ height: "5px;" }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%;" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                          <div className="action">
                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"> <i className="fa fa-pencil h5 m-0"></i></a>
                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"> <i className="fa fa-remove h5 m-0"></i></a>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">2</th>
                        <td>Landing page Design</td>
                        <td>04/6/2019</td>
                        <td>
                          <span className="text-primary font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Pending</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Deborah Mixon">
                              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle avatar-xs" alt="" width='12px' height="15px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Scott Jessie">
                              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle avatar-xs" alt="" height="35px" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">78%</span></p>

                          <div className="progress mt-2" style={{ height: " 5px;" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "78%;" }} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                          <div className="action">
                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"> <i className="fa fa-pencil h5 m-0"></i></a>
                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"> <i className="fa fa fa-remove h5 m-0"></i></a>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">3</th>
                        <td>Multipurpose Landing Template</td>
                        <td>06/6/2019</td>
                        <td>
                          <span className="text-success font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Neil Wing">
                              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Stanley Barber">
                              <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Roger Drake">
                              <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Jack Krier">
                              <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">100%</span></p>

                          <div className="progress mt-2" style={{ height: "5px;" }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%;" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                          <div className="action">
                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"> <i className="fa fa-pencil h5 m-0"></i></a>
                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"> <i className="fa fa fa-remove h5 m-0"></i></a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Blog Template Design</td>
                        <td>07/5/2019</td>
                        <td>
                          <span className="text-success font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Roger Drake">
                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reggie James">
                              <img src="https://bootdey.com/img/Content/avatar/avatar8.png" className="rounded-circle avatar-xs" alt=""height="35px" />
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Gerald Mayberry">
                              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">100%</span></p>

                          <div className="progress mt-2" style={{ height: "5px;" }}>
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%;" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                          <div className="action">
                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"> <i className="fa fa-pencil h5 m-0"></i></a>
                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"> <i className="fa fa fa-remove h5 m-0"></i></a>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">5</th>
                        <td>Brand logo design</td>
                        <td>08/6/2019</td>
                        <td>
                          <span className="text-primary font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Pending</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Deborah Mixon">
                              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Scott Jessie">
                              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle avatar-xs" alt="" height="35px" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">54%</span></p>

                          <div className="progress mt-2" style={{ height: "5px;" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "54%;" }} aria-valuenow="54" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                          <div className="action">
                            <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"> <i className="fa fa-pencil h5 m-0"></i></a>
                            <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"> <i className="fa fa fa-remove h5 m-0"></i></a>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">6</th>
                        <td>Redesign - Landing page</td>
                        <td>10/6/2019</td>
                        <td>
                          <span className="text-primary font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Pending</span>
                        </td>
                        <td>
                          <div className="team">
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Neil Wing">
                              <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle avatar-xs" alt=""height="35px"  />
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Stanley Barber">
                              <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle avatar-xs" alt="" height="35px"/>
                            </a>
                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Roger Drake">
                              <img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle avatar-xs" alt=""height="35px" />
                            </a>

                            <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="" data-original-title="Jack Krier">
                              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle avatar-xs" alt=""height="35px" />
                            </a>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">Progress<span className="float-right">41%</span></p>

                          <div className="progress mt-2" style={{ height: " 5px;" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "41%;" }} aria-valuenow="41" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </td>

                        <td>
                        </td></tr>
                        </tbody>
                  </table>
                </div>                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gutters-sm">
            <div className="col-md-2 mb-2">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Kenneth Valdez
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      fip@jukmuh.al
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (239) 816-9029
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (320) 380-4539
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Bay Area, San Francisco, CA
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

    </>
  );
}
