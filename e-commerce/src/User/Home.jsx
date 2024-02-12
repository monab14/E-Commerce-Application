import React, { useState, useEffect } from 'react';

const Home = ({ searchQuery }) => {
    // Add CSS to hide horizontal scrollbar
    document.body.style.overflowX = 'hidden';

    // State to store product data
    const [products, setProducts] = useState([]);
    // State to store filtered products based on search query
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const filterProductsByCategory = category => {
      if (category === 'All Categories') {
        // If 'All Categories' selected, show all products
        setFilteredProducts(products);
      } else {
        // Filter products based on selected category
        const filtered = products.filter(product => product.category === category);
        setFilteredProducts(filtered);
      }
      setSelectedCategory(category); // Set the selected category
    };

    useEffect(() => {
        // Fetch data from the provided URL
        fetch('http://localhost:8080/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                // Initially, set filtered products to all products
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Filter products based on search query
    useEffect(() => {
        if (!searchQuery) {
            // If search query is empty, show all products
            setFilteredProducts(products);
        } else {
            // Filter products based on search query
            const filtered = products.filter(product =>
                product.pname.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    // Mapping of product IDs to image sources
    const productImages = {
        '65ca0be55f4fe91c701a05fc': 'saree.webp',
        '65ca0eea5f4fe91c701a05fd': 'formal.webp' // Example mapping for product ID '65ca0eea5f4fe91c701a05fd'
        // Add more mappings for other product IDs and images
    };

    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * discount) / 100;
        const roundedDiscountedPrice = Math.floor(discountedPrice / 10) * 10 - 1; // Round off to nearest integer ending with 9 less than the discounted price
        return roundedDiscountedPrice; // Return rounded discounted price
    };

    return (
        <div className='container' style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <div className="row">
                 <div className="col-md-2">
          <div className="list-group" style={{ padding: '20px' }}>
            <a href="#" className={`list-group-item list-group-item-action ${selectedCategory === 'All Categories' ? 'active' : ''}`} onClick={() => filterProductsByCategory('All Categories')} style={{ fontSize: '1.1rem' }}>
              All Categories
            </a>
            <a href="#" className="list-group-item list-group-item-action" style={{ fontSize: '1.1rem' }} onClick={() => filterProductsByCategory('Fashion')}>Fashion</a>
            <a href="#" className="list-group-item list-group-item-action" style={{ fontSize: '1.1rem' }} onClick={() => filterProductsByCategory('Electronics')}>Electronics</a>
            {/* Add more category options */}
          </div>
        </div>
                <div className="col-md-10">
                    <div className="container overflow-hidden text-center">
                        <div className="row gy-7">
                            {filteredProducts.map((product, index) => (
                                <div key={index} className="col-3" style={{ marginTop: '20px' }}>
                                    <div className="card" style={{ width: '100%', maxWidth: '250px', textAlign: 'justify' }}>
                                        <div className="card-body">
                                            <img src={productImages[product.pid]} className="card-img-top" alt="product" />
                                            <h5 className="card-title" style={{ textAlign: 'center' }}>{product.pname}</h5>
                                            <h6 className="card-text">{product.pdesc}</h6>
                                            <span style={{ fontSize: '19px', color: 'red', marginRight: '10px' }}>₹{calculateDiscountedPrice(product.price, product.discount)}</span>
                                            <span style={{ fontSize: '14px', color: 'black', textDecoration: 'line-through', marginRight: '30px' }}>₹{product.price}</span>
                                            <span className="card-text" style={{ color: 'green', fontSize: '16px' }}>{product.discount}% off</span>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div>
                                                    <button className="btn btn-sm btn-warning mr-2" style={{ marginRight: '45px', color: 'white' }}><b>Add to cart</b></button>
                                                    <button className="btn btn-sm btn-success mr-2" ><b>Buy Now</b></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
