import React from 'react'
import searh from "../images/search1.svg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({onSearch}) => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/searched/${searchQuery}`);
    };
   
    
    
  return (
    <div className="search_container">
          <form className="input input--search" onSubmit={handleSubmit}>
            <img src={searh} alt="" className="search__icon" />
            <input
              type="text"
              className="nav__input"
              placeholder="Search Your Favourite movies or shows here..."
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}
            />
          </form>
        </div>
  )
}

export default SearchBox
