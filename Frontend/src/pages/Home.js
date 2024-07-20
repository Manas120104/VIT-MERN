import React from 'react';
import './Home.css'; // Importing the CSS file for styling
import image from './com.jpeg'; 

const Home = () => {
    return (
        <div>
            <div className="background-image"></div>
            <div className="content">
                <div className="left-section">
                    <img src={image} alt="Description" className="left-image" />
                    <div className="text-section">
                        <div className="tagline">
                            Empower Your Voice! Seamlessly Register and Manage Complaints with Ease
                        </div>
                        <div className="middle">
                            On
                        </div>
                        <div className="sub-tagline">
                            Consult Ease: Simplifying Your Complaints, One Click at a Time!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
