import React, { useState, useEffect } from 'react';
import axios from 'axios';
 // Create this CSS file for styling

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newHotel, setNewHotel] = useState({
        name: '',
        location: '',
        price: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = () => {
        axios.get('http://localhost:9091/hotels')
            .then(response => {
                setHotels(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching hotels:', err);
                setError('Failed to load hotels');
                setLoading(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        alert('Search functionality coming soon!');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHotel(prev => ({ ...prev, [name]: value }));
    };

    const handleAddHotel = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9091/hotels', newHotel)
            .then(response => {
                setHotels(prev => [...prev, response.data]);
                setNewHotel({ name: '', location: '', price: '', imageUrl: '' });
            })
            .catch(err => {
                console.error('Error adding hotel:', err);
                alert('Failed to add hotel');
            });
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <h1>Welcome to Our Hotel Booking Platform</h1>
                <p>Discover and book the best hotels around you</p>
                <button className="cta-button" onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}>
                    Explore Hotels
                </button>
            </header>

            <main>
                {/* Search Section */}
                <section className="search-section card-section">
                    <h2>Search Hotels</h2>
                    <form className="search-form" onSubmit={handleSearch}>
                        <input type="text" placeholder="Destination" required />
                        <input type="date" placeholder="Check-in" required />
                        <input type="date" placeholder="Check-out" required />
                        <input type="number" min="1" defaultValue="1" required />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </section>

                {/* Add Hotel Section */}
                <section className="add-hotel-section card-section">
                    <h2>Add a New Hotel</h2>
                    <form className="add-hotel-form" onSubmit={handleAddHotel}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Hotel Name"
                            value={newHotel.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={newHotel.location}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price per night"
                            value={newHotel.price}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL (optional)"
                            value={newHotel.imageUrl}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="add-button">Add Hotel</button>
                    </form>
                </section>

                {/* Hotel List Section */}
                <section className="hotel-list-section card-section">
                    <h2>Available Hotels</h2>
                    {loading && <p>Loading hotels...</p>}
                    {error && <p className="error-message">{error}</p>}

                    <div className="hotel-grid">
                        {hotels.map(hotel => (
                            <div key={hotel.id} className="hotel-card">
                                <img
                                    src={hotel.imageUrl || 'https://via.placeholder.com/400x200'}
                                    alt={hotel.name}
                                    className="hotel-image"
                                />
                                <div className="hotel-info">
                                    <h3>{hotel.name}</h3>
                                    <p>{hotel.location}</p>
                                    <p className="hotel-price">₹{hotel.price.toLocaleString('en-IN')} / night</p>
                                    <button className="book-button">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
