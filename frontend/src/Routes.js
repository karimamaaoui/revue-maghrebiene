import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from '../src/Components/Authentification/registerForm';
import NoRouteFound from './Components/NoRoute/noRouteFound';
import LoginForm from './Components/Authentification/loginForm';
import ForgotPassword from './Components/Authentification/ForgotPassword';
import RestPassword from './Components/Authentification/RestPassword';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/Profile/updateProfile';
import FormArticle from './Components/editorPanel/checkedCorrection/formArticle';
import AdminStarted from './Components/adminPanel/views/Starter';
import AdminPage from './Components/adminPanel/adminpage';
import ManageUser from '../src/Components/adminPanel/manageUsers/manageUser'
import AddNewUser from '../src/Components/adminPanel/manageUsers/AddNewUser'

import Article from './Components/Articles/Articles';
import ManageArticle from '../src/Components/adminPanel/manageArticle/manageArticle'
import PageAccueil from './Components/Home/pageAccueil';
import Search from "./Components/Search/searchPage"

import EditArticle from "./Components/adminPanel/manageArticle/editArticles"
import AttributeArticle from "./Components/searchWithAttribute/searchWithAttribute"
import ListRule from "./Components/adminPanel/manageRule/listRule"

import Feedback from './Components/feedback/Feedback'
import DemandAuthor from './Components/DemandAuthor/demandAuthor';
import AcceptDemand from './Components/DemandAuthor/AcceptDemand'
import AddPost from './Components/Home/readArticle'
import FavoriteList from './Components/Favorite/favoriteList'

import MostRead from './Components/MostRead/MostRead'

import RepondingToArticle from './Components/editorPanel/RepondingToArticle'
import CorrectionPage from './Components/editorPanel/CorrectionPage'
import Landing from './Landing'
import Chat from './Components/Chat/Chat'
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { AppContext, socket } from "./Components/Chat/AppContext";
import AddRule from './Components/adminPanel/manageRule/addRule';
import EditRule from './Components/adminPanel/manageRule/editRule';
import ListType from './Components/adminPanel/manageType/listType';
import AddType from './Components/adminPanel/manageType/addType';
import EditType from './Components/adminPanel/manageType/editType';
import ListAttribute from './Components/adminPanel/manageAttribute/listAttribute';
import EditAttribute from './Components/adminPanel/manageAttribute/editAttribute';
import AddAttribute from './Components/adminPanel/manageAttribute/addAttribute';
import ListFeedback from './Components/adminPanel/manageFeedback/feedbackList';
import ShowArticle from './Components/Articles/ShowArticle/showArticle';
import UpdateUser from './Components/adminPanel/manageUsers/updateUser';

export default function RoutesList() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [notification, setNotification] = useState([]);

  return (
    <>
      <AppContext.Provider value={{
        socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg,
        setPrivateMemberMsg, rooms, notification, setNotification, setRooms, newMessages, setNewMessages
      }}>
        <Router>

          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/favorite" element={<FavoriteList />} />
              <Route path="/rules" element={<ListRule />} />
              <Route path="/managefeedback" element={<ListFeedback />} />

              <Route path="/mostread" element={<MostRead />} />
              <Route path="/respond" element={<RepondingToArticle />} />
              <Route path="/correction/:id" element={<CorrectionPage />} />


              <Route path="/read/:id" element={<AddPost />} />

              <Route path="/search" element={<Search />} />
              <Route path="/home" element={<PageAccueil />} />
              <Route path="/demand" element={<DemandAuthor />} />
              <Route path="/accept" element={<AcceptDemand />} />

              <Route path="/feedback" element={<Feedback />} />

              <Route path="/article" element={<Article />} />
              <Route path="/getarticlefromattribute/:id" element={<AttributeArticle />} />

              <Route path="/addnewuser" element={<AddNewUser />} />

              <Route path="/users" element={<ManageUser />} />
              <Route path="/addrule" element={<AddRule />} />
              <Route path="/addattribute" element={<AddAttribute />} />

              <Route path="/addtype" element={<AddType />} />
              <Route path="/types" element={<ListType />} />
              <Route path="/attributes" element={<ListAttribute />} />

              <Route path="/managearticles" element={<ManageArticle />} />
              <Route path="/managearticles/:key" element={<ManageArticle />} />

              <Route path="/managearticles/search" element={<ManageArticle />} />

              <Route path="/editarticle/:id" element={<EditArticle />} />
              <Route path="/editattribute/:id" element={<EditAttribute />} />

              <Route path="/editrule/:id" element={<EditRule />} />
              <Route path="/edittype/:id" element={<EditType />} />

              <Route path="/getList" element={<ShowArticle />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<UpdateProfile />} />
              <Route path="/edituser/:id" element={<UpdateUser />} />

              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/arti/:id" element={<FormArticle />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/restpassword" element={<RestPassword />} />
              <Route exact path='/*' element={<NoRouteFound />} />
              <Route exact path='/profile' element={<FormArticle />} />



              <Route exact path="/starter" element={<AdminStarted />} />
              <Route exact path="/adminpanel" element={<AdminPage />} />




            </Routes>

          </div>

        </Router>
      </AppContext.Provider>
    </>

  );
}

