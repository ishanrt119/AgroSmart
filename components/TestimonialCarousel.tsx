import React, { useState, useEffect } from 'react';

const testimonials = [
    {
        quote: "AgroSmart has revolutionized the way I farm. The crop recommendations are accurate and have boosted my yield by almost 30%!",
        name: "Ramesh Singh",
        location: "Sikkim, India"
    },
    {
        quote: "The real-time weather and soil data is a game-changer for managing irrigation. I'm saving water and my crops have never been healthier.",
        name: "Sunita Devi",
        location: "Himachal Pradesh, India"
    },
    {
        quote: "Being able to check market prices instantly helps me sell my produce at the right time. This app is an essential tool for any modern farmer.",
        name: "Vikram Choudhary",
        location: "Uttarakhand, India"
    }
];

const TestimonialCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change testimonial every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative p-8 bg-black/30 backdrop-blur-sm rounded-xl text-white shadow-lg">
            <div className="relative">
                <p className="text-lg italic leading-relaxed">"{currentTestimonial.quote}"</p>
                <p className="mt-4 font-bold text-right">- {currentTestimonial.name}</p>
                <p className="text-sm text-gray-300 text-right">{currentTestimonial.location}</p>
            </div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-colors`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
