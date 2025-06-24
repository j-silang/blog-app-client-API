import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register(){
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	function registerUser(e){
		e.preventDefault();

		axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
			username: username,
			email: email,
			password: password
		})
		.then(response => {
			if(response.status === 201){
				Swal.fire({
    	    title: "Registration Successful",
    	    icon: "success",
    	    text: "Thank you for registering!"
		    })
		    .then(() => {
		    	setUsername("");
		    	setEmail("");
		    	setPassword("");
		    	setConfirmPassword("");
		    	navigate("/login");
		    });
			}else{
				Swal.fire({
    	    title: "Something went wrong.",
    	    icon: "error",
    	    text: "Please try again later or contact us for assistance"
    		});
			}
		})
	}

	useEffect(() => {
		if(
			username !== "" &&
			email !== "" &&
			password !== "" &&
			confirmPassword !== "" &&
			password === confirmPassword
		){
			setIsActive(true);
		}else{
			setIsActive(false);
		}
	}, [username, email, password, confirmPassword])

	return (
		user.id !== null
		? <Navigate to="/" />
		: <Container className="mt-4">
		    <Row className="justify-content-center">
		      <Col xs={12} md={8} lg={6}>
		        <h1 className="text-center mb-4">Register</h1>
		        <Card>
		          <Card.Body>
		            <Form onSubmit={e => registerUser(e)}>
		            	<Form.Group className="mb-3">
		            	  <Form.Label>Username:</Form.Label>
		            	  <Form.Control 
		            	    type="string"
		            	    placeholder="Enter your username"
		            	    value={username}
		            	    onChange={e => setUsername(e.target.value)}
		            	    required
		            	  />
		            	</Form.Group>

		              <Form.Group className="mb-3">
		                <Form.Label>Email:</Form.Label>
		                <Form.Control 
		                  type="email"
		                  placeholder="Enter your email"
		                  value={email}
		                  onChange={e => setEmail(e.target.value)}
		                  required
		                />
		              </Form.Group>

		              <Form.Group className="mb-3">
		                <Form.Label>Password:</Form.Label>
		                <Form.Control 
		                  type="password"
		                  placeholder="Enter Password"
		                  value={password}
		                  onChange={e => setPassword(e.target.value)}
		                  required
		                />
		              </Form.Group>

		              <Form.Group className="mb-4">
		                <Form.Label>Confirm Password:</Form.Label>
		                <Form.Control 
		                  type="password"
		                  placeholder="Confirm Password"
		                  value={confirmPassword}
		                  onChange={e => setConfirmPassword(e.target.value)}
		                  required
		                />
		              </Form.Group>

		              {
		                isActive
		                ? <Button variant="primary" type="submit" className="w-100">Submit</Button>
		                : <Button variant="danger" type="submit" className="w-100" disabled>Please enter your registration details</Button>
		              }
		            </Form>
		          </Card.Body>
		        </Card>
		      </Col>
		    </Row>
		  </Container>
	)
}