import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moviecard from "../Components/Moviecard";
import Slider from "react-slick";
import '../index.css'
import './Searched.css'
const Searched = () => {
  const apiKey = `48b7fd8eddafbd865f8799c3047acbc2`;
  const { search } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
        );
        setSearchResults(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSearchResults(); // Call the fetchSearchResults function
  }, [search]);

  return (
   <div className="searchedMain">
     <div className="searchedContainer ">
      {searchResults?.map((item) => {
        const { id, original_title, overview, vote_average, poster_path } =
          item;
        return (
          <div className="searchItemCard" key={id}>
            <Moviecard
              title={original_title}
              rating={vote_average}
              image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              movie={item}
            />
          </div>
        );
      })}
    </div>
  </div>
  );
};

export default Searched;
