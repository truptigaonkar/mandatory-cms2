import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Reviews = (props) => {
    const id = props.id;
    const [reviews, setReviews] = useState([]);

    // componentDidMount() without hook
    useEffect(() => {
        Axios.get(`http://192.168.99.102:8085/api/collections/get/reviews/Case?&filter[product._id]=${id}`)
            .then(response => {
                console.log("Reviews entry:", response.data.entries);
                setReviews(response.data.entries);
            })
    }, [id])

    return (
        <>
            <h3>Reviews page</h3>
            {reviews.map((review) => (
                <>
                    <ul key={review._id}>
                        <li>{review._id}</li>
                        <li>{review.title}</li>
                        <li>{review.body}</li>
                        <li>{review.rating}</li>
                        <li>{review.product.display}</li>
                    </ul><hr />
                </>
            ))}
        </>
    );
};

export default Reviews;