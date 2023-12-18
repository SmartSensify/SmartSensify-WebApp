import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      <Link to="/login">Go to Login</Link>
      <h3>All sensors:</h3>
      <Link to="/sensors">link</Link>
    </div>
  );
};

export default HomePage;