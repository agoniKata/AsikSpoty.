import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Container, Navbar, Nav } from "react-bootstrap";
const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
