import { useState } from "react";
import fvrt from "../../src/images/fvrt.png";
import { UserAuth } from "../Context/Authcontext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Context/firbase";
import '../Components/MovieDetails.css'

const AddToFvrtBtn = ({ id, title, img, type }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();
    const userDoc = doc(db, "users", `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            
            if (type === "movie") {
              await updateDoc(userDoc, {
                savedMovies: arrayUnion({
                  id: id,
                  title: title,
                  img: img,
                }),
              });
            } else if (type === "show") {
              await updateDoc(userDoc, {
                savedShows: arrayUnion({
                  id: id,
                  title: title,
                  img: img,
                }),
              });
            }
          } else {
            alert("Please login first");
          }
    };

//   function print() {
//     alert("huii");
//   }

  return (
    <div className="add_to_favourites_btn">
      <img src={fvrt} alt="" />
      <button onClick={saveShow}>Add To Favourites</button>
    </div>
  );
};

export default AddToFvrtBtn;
