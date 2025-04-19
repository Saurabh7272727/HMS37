import React from 'react'
import './Home.scss';
import HeroSection from '../../components/HeroSection';
import AllTags from '../AllTags';
import BannerTest from '../../components/BannerTest.jsx';
const Home = () => {
    return (
        <>
            <BannerTest />
            <HeroSection />
            <AllTags />
        </>
    )
}

export default Home;