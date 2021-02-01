import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    try {
      const fecthData = async () => {
        const response = await RestaurantsFinder.get(`/${id}`);
        console.log(response);
        setSelectedRestaurant(response.data.data.restaurants);
      };
      fecthData();
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return (
    <div>
      {selectedRestaurant && <StarRating rating={4.5}/>}
      <br />
      <button onClick={() => history.goBack()} className="btn btn-warning my-3">
        Back
      </button>
    </div>
  );
};

export default RestaurantDetailPage;
