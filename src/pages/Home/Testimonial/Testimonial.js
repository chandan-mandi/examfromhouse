import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://examfromhouse.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    })
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                <h1 className="text-4xl font-bold title-font text-purple-900 mb-12 text-center">Testimonials</h1>
                <Carousel itemsToShow={1}>
                    {reviews.map(review => <TestimonialCard
                        key={review._id}
                        review={review}
                    ></TestimonialCard>
                    )}
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonial;