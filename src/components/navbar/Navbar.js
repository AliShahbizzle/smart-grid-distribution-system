import React, { Component } from 'react'
import * as ReactBootStrap from 'react-bootstrap'

export class Navbar extends Component{
    render () {

        return (
            <>
                <ReactBootStrap.Navbar bg="light" variant="light">
                    <ReactBootStrap.Navbar.Brand href="/">Smart Grid Transformer Sizing Tool</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Nav className="mr-auto">
                    <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link href="/transformer">Transformer Sizing</ReactBootStrap.Nav.Link>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Form inline>
                    </ReactBootStrap.Form>
                </ReactBootStrap.Navbar>
            
            
            </>
        )
    }
}

export default Navbar