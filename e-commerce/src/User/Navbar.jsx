import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchInput(query);
        onSearch(query); // Pass the search query to the parent component
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd', width: '100%', minHeight: '50px' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ fontSize: '2.0rem', fontFamily: 'cursive', color: 'darkorange', fontWeight: 'bold', marginRight: '350px' }}>CartCraze</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex" role="search" style={{ fontSize: '1.0rem', width: '50%' }}>
                            <input className="form-control me-2" type="text"
                                value={searchInput}
                                onChange={handleInputChange}
                                placeholder="Search for products, brands and more.. " aria-label="Search" style={{ fontSize: '1.0rem', borderRadius: '10px', shapeOutside: 'border-box', borderColor: 'ButtonShadow' }}  / >
                                   <span className="search-icon" style={{ fontSize: '1.5rem', marginLeft: '-35px' }}>&#x1F50D;</span>
                            
                           
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="bi bi-cart3" style={{ fontSize: '1.5rem', color: 'black' }}></i>
                                    <img src="cart.png" alt="Cart" style={{ width: '50px', height: '45px' }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <i className="bi bi-person" style={{ fontSize: '1.5rem' }}></i>
                                    <img src="pro.png" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'white' }} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
