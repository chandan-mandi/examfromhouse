import React from 'react';
import Banner from '../Banner/Banner';
import Contact from '../../Shared/Contact/Contact';
import FeatureShort from '../FeatureShort/FeatureShort';
import Testimonial from '../Testimonial/Testimonial';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner />
			<FeatureShort />
			<Testimonial />
			<Contact />
            <Footer />
        </div>
    );
};

export default Home;