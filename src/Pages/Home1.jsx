import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home1.css';  // Import the CSS file
import newlogo from "../assets/newlogo.jpg"

const Home1 = () => {
    const navigate = useNavigate(); 
    
    // State to handle dropdown visibility
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    // State to handle the current image index for the carousel
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of images for the carousel
    const images = [
        "https://media.licdn.com/dms/image/v2/D4D12AQGXgFD6Y_Ql3Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696919248399?e=2147483647&v=beta&t=YEbCJ9fbQdyNGmsfYwhEevp68u44MHJMv1G9TwT1-6o",
        "https://imageio.forbes.com/specials-images/imageserve/1206859285/Tom-Hanks---Rita-Wilson/960x0.jpg?format=jpg&width=960",
        "https://goingbionic.com/wp-content/uploads/2017/03/film-production-on-set.jpg"
    ];

    // Function to automatically change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle images
        }, 3000); // Change image every 3 seconds

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []); // Empty dependency array to run only once when component mounts

    // Function to handle login button click (toggles dropdown visibility)
    const handleLoginClick = () => {
        setDropdownVisible(prev => !prev); // Toggle dropdown visibility
    };

    // Handle dropdown item click and navigate to respective login page
    const handleDropdownSelect = (role) => {
        if (role === 'artist') {
            navigate('/artist-login');  // Navigate to Artist login page
        } else if (role === 'director') {
            navigate('/director-login');  // Navigate to Director login page
        }
        setDropdownVisible(false); // Hide dropdown after selection
    };

    // Define the handleRegisterClick function to navigate to the /new (register) page
    const handleRegisterClick = () => {
        navigate('/new');  // Navigate to the registration page
    };

    return (
        <div className="container1">
            <nav className='neadnav'>
                <img src={newlogo} alt="" srcset="" />

            </nav>
            <nav className="navbar1">
                {/* "Login" button that toggles the dropdown visibility */}
                <button className="button6" onClick={handleRegisterClick}>
                    Register
                </button>
                <button className="button6" onClick={handleLoginClick}>
                    Login
                </button>
                

                {/* Dropdown menu (only visible when dropdownVisible is true) */}
                {dropdownVisible && (
                    <div className="dropdown1">
                         <button className="dropdownItem1" onClick={() => handleDropdownSelect('director')}>
                            Director Login
                        </button>
                        <button className="dropdownItem1" onClick={() => handleDropdownSelect('artist')}>
                            Artist Login
                        </button>
                    </div>
                )}
            </nav>

            {/* Image carousel */}
            <div className="carousel">
                <img 
                    src={images[currentIndex]} 
                    alt={`carousel-${currentIndex}`} 
                    className="carousel-image" 
                />
            </div>
        </div>
    );
};

export default Home1;

