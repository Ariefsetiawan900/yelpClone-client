import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

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
        // console.log(response);
        setSelectedRestaurant(response.data.data);
      };
      fecthData();
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurants.name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurant.restaurants.average_rating}
            />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurants.count
                ? `(${selectedRestaurant.restaurants.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
      <button onClick={() => history.goBack()} className="btn btn-warning my-3">
        Back
      </button>
    </div>
  );
};

export default RestaurantDetailPage;
