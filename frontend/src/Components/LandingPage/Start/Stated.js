import Start from '../Start/About';
import { Contact } from '../Contacts/Contacts';
import NavbarsPage from '../Navbars/NavbarsPage';
import Services from '../Service/Services';
import About from '../About/about';
import Features from '../Features/Features';
import Agent from '../Agent/Agent';
import Footer from '../Footer/footer';

function Started() {
    return (
<div >    
      <NavbarsPage/>
      <Start/>
      <Services/>
      <About/>
      <br/>
      <Features/>
      <br/>
      <Agent/>
      <Contact/>
      <br/>
     <Footer/>
  </div>
    )
}

export default Started