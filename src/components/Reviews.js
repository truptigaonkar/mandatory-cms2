import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CardHeader, CardBody, Card, CardText, Input, Badge } from 'reactstrap';

const API_URL = `${process.env.REACT_APP_API_URL}`;

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
        axios.get(`${API_URL}/api/collections/get/reviews/Case?&filter[product._id]=${id}`)
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
            axios.post(`${API_URL}/api/collections/save/reviews`, {
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
            <Card>
                <CardHeader style={{ textAlign: 'center' }}><h5>Reviews <Badge color="secondary">{reviews.length}</Badge></h5></CardHeader>
                <CardBody>
                    <p style={{ color: 'green' }}>{successMessage}</p>
                    {reviews.map((review) => (
                        <>
                            <ul key={review._id}>
                                <b>{review.title} <div style={{float:"right"}}><star-rating value={review.rating}></star-rating></div></b>
                                <p>{review.body}</p>
                            </ul><hr />
                        </>
                    ))}
                </CardBody>
                <Card style={{ margin: '20px' }}>
                    <CardHeader>Write a review</CardHeader>
                    <CardBody>
                        <CardText>
                            <div style={{ color: 'red' }}>{errorMessage}</div>
                            <Input type="text" placeholder="Title...." onChange={e => setNewReviewsTitle(e.target.value)} value={newReviewsTitle} /><br />
                            <Input type="text" placeholder="Body...." onChange={e => setNewReviewsBody(e.target.value)} value={newReviewsbody} />
                            {/* <Input type="range" step="1" min="0" max="5" onChange={e => setNewReviewsRating(e.target.value)} value={newReviewsRating} /> */}

                            <Input style={{ width: "100%" }} type="range" name="rating" id="rating" placeholder="Rating" min="1" max="5" step="1" value={newReviewsRating} onChange={e => setNewReviewsRating(e.target.value)} />
                            <Badge sm={1} color="success">{newReviewsRating}</Badge>  {/* Showing movie rating */}
                            <Button color="info" size="lg" block onClick={handleCreateReview}>SEND</Button>
                        </CardText>
                    </CardBody>
                </Card>
            </Card>
        </>
    );
};

export default Reviews;