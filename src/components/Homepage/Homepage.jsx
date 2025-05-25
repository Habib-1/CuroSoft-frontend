import React from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About'
import Contact from '../Contact/Contact'
import Services from '../Services/Services'
const Homepage = () => {
    return (
        <div>
            <Hero></Hero>
            {/* <Doctor></Doctor> */}
            <Services></Services>
            <About></About>
            <Contact></Contact>
            
        </div>
    );
};

export default Homepage;