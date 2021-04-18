import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">Portfolio Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
