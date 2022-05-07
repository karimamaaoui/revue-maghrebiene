import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from '../src/Components/Authentification/registerForm';
import Started from '../src/Components/LandingPage/Start/Stated'
import NoRouteFound from './Components/LandingPage/NoRoute/noRouteFound';
import LoginForm from './Components/Authentification/loginForm';
import Authenticate from './Components/LandingPage/Authenticate/Authenticate';
//import ArticleScreen from './Components/Home/Articles/Articles';
import ForgotPassword from './Components/Authentification/ForgotPassword';
import RestPassword from './Components/Authentification/RestPassword';
import SideBar from './Components/sideBar/sideBar';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/Profile/updateProfile';
import FormArticle from './Components/Articles/formArticle';
import AdminStarted from './Components/adminPanel/views/Starter';
import AboutAdmin from './Components/adminPanel/views/About';
import Alerts from './Components/adminPanel/views/ui/Alerts';
import Buttons from './Components/adminPanel/views/ui/Alerts';
import Badges from './Components/adminPanel/views/ui/Badges';
import Table from './Components/adminPanel/views/ui/Tables';
import Grid from './Components/adminPanel/views/ui/Grid';
import Breadcrumbs from './Components/adminPanel/views/ui/Breadcrumbs';
import Cards from './Components/adminPanel/views/ui/Cards';
import Forms from './Components/adminPanel/views/ui/Forms';
//import FullLayout from './Components/adminPanel/layouts/FullLayout'
import AdminPage from './Components/adminPanel/adminpage';
import ManageUser from '../src/Components/adminPanel/manageUsers/manageUser'

import Article from './Components/Articles/Articles';
import ManageArticle from '../src/Components/adminPanel/manageArticle/manageArticle'
import AddFile from './Components/Home/addfile';
import Test from "../src/test"
import PageAccueil from './Components/Home/pageAccueil';
import Search from "./Components/Search/searchPage"
import Feed from "./Components/feed/feed"

import EditArticle from "./Components/adminPanel/manageArticle/editArticles"



export default function RoutesList() {

  return (
    <Router>

      <div>
        <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/home" element={<PageAccueil />} />


        <Route path="/article" element={<Article />} />
        <Route path="/t" element={<Feed />} />

        <Route path="/users" element={<ManageUser />} />
        <Route path="/managearticles" element={<ManageArticle />} />
        <Route path="/managearticles/:key" element={<ManageArticle />} />

        <Route path="/managearticles/search" element={<ManageArticle />} />

        <Route path="/editarticle/:id" element={<EditArticle />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<UpdateProfile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Started />} />
          <Route path="/start" element={<Authenticate />} />
          {/* <Route path="/a" element={<FormArticle />} /> */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/restpassword" element={<RestPassword />} />
          <Route path="/s" element={<AddFile />} />
          <Route exact path='/*' element={<NoRouteFound />} />          
          <Route exact path='/form' element={<FormArticle /> } />



          <Route exact path="/starter" element= {<AdminStarted />} />
          <Route exact path="/aboutadmin" element= {<AboutAdmin />} />
          <Route exact path="/alerts" element= {<Alerts />} />
          <Route exact path="/badges" element= {<Badges />} />
          <Route exact path="/buttons" element= {<Buttons />} />
          <Route exact path="/cards" element= {<Cards />} />
          <Route exact path="/grid" element= {<Grid />} />
          <Route exact path="/table" element= {<Table />} />
          <Route exact path="/forms" element= {<Forms />} />
          <Route exact path="/breadcrumbs" element= {<Breadcrumbs />} />
          <Route exact path="/adminpanel" element= {<AdminPage />} />




        </Routes>

      </div>

    </Router>
  );
}
