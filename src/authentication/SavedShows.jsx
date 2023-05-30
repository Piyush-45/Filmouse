import React, { useState, useEffect } from "react";
import { db } from "../Context/firbase";
import { onSnapshot, doc } from "firebase/firestore";
import { UserAuth } from "../Context/Authcontext";
import { Link } from "react-router-dom";
import "../SavedShows/SavedShows.css";

import "../index.css";
import "../Components/Moviecard.css";

const SavedShows = () => {
  const { user } = UserAuth();
  const [savedShows, setSavedShows] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedShows(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <section className="savedShows-container">
      <div className="savedShows">
        <h2>Your Saved Shows</h2>
        <div className="showsList">
          <div className="showCard">
            {savedShows.map((show) => (
              <div key={show.id}>
                {show.type === "movie" ? (
                  <Link to={`/movie/${show.id}`}>
                    <img src={show.img} alt={show.title} className="image" />
                    <h3>{show.title}</h3>
                  </Link>
                ) : (
                  <Link to={`/tvshow/${show.id}`}>
                    <img src={show.img} alt={show.title} className="image" />
                    <h3>{show.title}</h3>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavedShows;


