import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom"; 
import Swal from "sweetalert2";
import axios from "axios";
import fetchUserDetails from "../services/fetchUserDetails";

export default function Login(){
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      email: email,
      password: password
    })
    .then(response => {
      if(response.data.access){
        localStorage.setItem("token", response.data.access);
        const data = fetchUserDetails();
        if (data) {
          setUser({
            id: data.id,
            isAdmin: data.isAdmin
          });
        }
        setEmail("");
        setPassword("");
        Swal.fire({
          title: "Login Successful",
          icon: "success"
        })
        
      }else{
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: "Check your login details and try again."
        });
      }
    })
    .catch(error => {
      if (error.response) {
        Swal.fire({
          title: "Login Error",
          icon: "error",
          text: error.response.data.message || "Invalid credentials"
        });
      } else if (error.request) {
        Swal.fire({
          title: "Network Error",
          icon: "error",
          text: "Unable to reach the server. Please try again later."
        });
      } else {
        Swal.fire({
          title: "Unexpected Error",
          icon: "error",
          text: error.message
        });
      }
    });
  }

  useEffect(() => {
    email !== "" && password !== ""
    ? setIsActive(true)
    : setIsActive(false)
  }, [email, password])

  return (
    user.id !== null
      ? <Navigate to="/posts" />
      : <Container className="mt-3">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h1 className="text-center mb-4">Login</h1>
              <Card className="mt-4">
                <Card.Body>
                  <Form onSubmit={authenticate}>
                    <Form.Group className="mb-3" controlId="userEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {
                      isActive
                      ? <Button variant="primary" type="submit" className="w-100">Submit</Button>
                      : <Button variant="danger" type="submit" className="w-100" disabled>Submit</Button>
                    }
                  </Form>
                </Card.Body>
              </Card>
              <p className="text-center mt-3">Don't have an account yet? <Link to="/register">Click here</Link> to register.</p>
            </Col>
          </Row>
        </Container>
  )
}