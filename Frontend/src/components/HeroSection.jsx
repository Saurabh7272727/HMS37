import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import './componenst.scss'
const HeroSection = () => {

    const images = [
        { url: "../../page-4.jpg" },
        { url: "../../page-2.jpg" },
        { url: "../../page-3.jpg" },
        { url: "../../page-1.jpg" },
        { url: "../../page-5.jpg" },
        { url: "../../page-6.jpg" },
    ];
    let screenWidth = window.screen.width;
    return (
        <>
            <div className="hero_section_pages">
                <SimpleImageSlider
                    width={screenWidth}
                    height={600}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                />
            </div>
        </>
    )
}

export default HeroSection;