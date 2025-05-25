import React from 'react';
import heroImg from '../../assets/hero2.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate=useNavigate();
    return (
        <div className="relative">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    filter: 'brightness(90%)', // dim the background for better text visibility
                }}
            >
                <div className="hero-overlay bg-black opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-5xl font-extrabold text-amber-400 mb-5 animate__animated animate__fadeIn">
                            Assalamu Alaikum !!
                        </h1>
                        <p className="text-xl text-lime-200 mb-6 animate__animated animate__fadeIn animate__delay-1s">
                            Feeling unwell? Just click on the Help Desk button and tell us your age, gender, and symptoms.
                            We’ll quickly suggest the right specialist doctor for you.<br />
                            — so you can get the care you need, faster and easier!
                        </p>
                        <button 
                        onClick={()=>navigate('/help-desk')}
                        className="btn btn-lg bg-red-700 hover:bg-red-600 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
                            Help Desk
                        </button>
                    </div>
                </div>
            </div>

            {/* Add animation via CSS library (e.g., Animate.css) */}
            <style jsx='true'>{`
                .animate__fadeIn {
                    animation: fadeIn 2s ease-in-out;
                }
                .animate__delay-1s {
                    animation-delay: 1s;
                }
                .animate__delay-2s {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default Hero;
