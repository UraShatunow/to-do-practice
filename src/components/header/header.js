import React from 'react';
import './header.css';

const Header = ({todo, done}) => {
  return (
    <div className="header">
      <h1>ToDo List</h1>
      <h2>todo - {todo}, done - {done}</h2>
    </div>
  )
}

export default Header;