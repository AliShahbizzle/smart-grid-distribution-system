import React, { Component } from 'react'
import './css/basestyle.css'
import './css/style.css'

export class HomePage extends Component {
    render() {
        return (
        <div className="wrapper">

        <section className="top-container">
            <header className="showcase">
                <div className="showcase-text">
                    <h1>Smart Grid Distribution Systems Tool</h1>
                    <p>View, calculate and analyze transformer and conductor sizing. </p>
                </div>
            </header>
        </section>


        <section className="boxes">
            <a href="#" className="box">
                <i className="fas fa-chart-pie fa-4x"></i>
                <h3>Analytics</h3>
                <p>View analystics</p>
            </a>
            <a href="/data/SLAR" className="box">
                <i className="fas fa-table fa-4x"></i>
                <h3>Data</h3>
                <p>View data</p>
            </a>
            <a href="/admin" className="box">
                <i className="fas fa-users fa-4x"></i>
                <h3>Admin</h3>
                <p>Access administrator area</p>
            </a>
            <a href="#" className="box">
                <i className="fas fa-question-circle fa-4x"></i>
                <h3>Help</h3>
                <p>View user guide and frequently asked questions.</p>
            </a>
        </section>
        <section className="footer">
            <div>
                <p className="footer-p">&copy; 2021 Ontario Tech University: Capstone Group 34</p>
            </div>
        </section>
    </div>
        )
    }
}

export default HomePage
