import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await RestaurantsFinder.get("/");
        // console.log(response);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err.message);
      }
    };
    fecthData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantsFinder.delete(`/${id}`);

      // console.log(response);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
      history.push(`/restaurants/${id}/update`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>review</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
