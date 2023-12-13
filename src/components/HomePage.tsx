import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default HomePage;