import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand>Welcome to BlogApp{user.username ? `, ${user.username}` : ""}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/posts">{!user.isAdmin ? "Posts" : "Dashboard"}</Nav.Link>
            {user.id !== null
              ? <>
                  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                </>
              : <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;