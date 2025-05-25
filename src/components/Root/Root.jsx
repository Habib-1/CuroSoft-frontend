import Header from '../Header/Header'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
import axios from 'axios';
import { AuthProvider } from '../../AuthContext/AuthContext'

const Root = () => {

    return (
        <div>
          <AuthProvider>
            <Header></Header>  
            <Outlet></Outlet>
            <Footer></Footer>
          </AuthProvider>
        
         
        </div>
    );
};

export default Root;