import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <Link to="/">Organization</Link>
      <span> &bull; </span>
      <Link to="/profile">Profile</Link>
    </header>
  );
};

export default Navigation;
