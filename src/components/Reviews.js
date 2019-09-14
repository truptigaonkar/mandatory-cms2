import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = (props) => {
    const id = props.id;
    const [reviews, setReviews] = useState([]);
    //Reveiws inputs
    const [newReviewsTitle, setNewReviewsTitle] = useState("");
    const [newReviewsbody, setNewReviewsBody] = useState("");
    const [newReviewsRating, setNewReviewsRating] = useState("");
    //Validation message
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // componentDidMount() without hook
    //LIST: Listing reviews
    useEffect(() => {
        axios.get(`http://192.168.99.102:8085/api/collections/get/reviews/Case?&filter[product._id]=${id}`)
            .then(response => {
                //console.log("List Reviews entry:", response.data.entries);
                setReviews(response.data.entries);
            })
    }, [id])

    //CREATE reviews function
    const handleCreateReview = (e) => {
        e.preventDefault();
        if (!newReviewsTitle || !newReviewsbody || !newReviewsRating) {
            setErrorMessage("You must fill all the details...");
            setTimeout(() => { setErrorMessage('') }, 2000); //above message will disappear after 2000sec.
        } else {
            axios.post(`http://192.168.99.102:8085/api/collections/save/reviews`, {
                data: {
                    title: newReviewsTitle,
                    body: newReviewsbody,
                    rating: newReviewsRating,
                    product: { _id: id }
                }
            })
            .then(response => {
                console.log("Create Reviews entry:", response.data);
                setReviews([...reviews, response.data]); 
                setSuccessMessage("Added review successfully...."); //Validation message
                setTimeout(() => { setSuccessMessage('') }, 2000); //above message will disappear after 2000sec.
            })
            // inputs becomes empty
            setNewReviewsTitle([]);
            setNewReviewsBody([]);
            setNewReviewsRating([]);
        }
    }
    return (
        <>
            <div>
                <h3>Create Reviews</h3>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                Title: <input type="text" placeholder="Title" onChange={e => setNewReviewsTitle(e.target.value)} value={newReviewsTitle} />
                Body: <input type="text" placeholder="Body" onChange={e => setNewReviewsBody(e.target.value)} value={newReviewsbody} />
                Rating: <input type="range" step="1" min="0" max="5" onChange={e => setNewReviewsRating(e.target.value)} value={newReviewsRating} />
                <button onClick={handleCreateReview}>Submit</button>
            </div><hr/>
            <h3>Reviews List</h3>
            <p style={{color:'green'}}>{successMessage}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Rating</th>
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
                            </tr>
                        </>
                    ))}
                </tbody>
            </table><hr />
        </>
    );
};

export default Reviews;