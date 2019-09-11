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
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Rating</th>
                        <th>Product</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <>
                            <tr key={review._id}>
                                <td>{review._id}</td>
                                <td>{review.title}</td>
                                <td>{review.body}</td>
                                <td>{review.rating}</td>
                                <td>{review.product.display}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Reviews;