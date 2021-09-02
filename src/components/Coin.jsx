import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ coin, deleteCoin }) => {
  return (
    <Link
      to={`/coin/${coin.id}`}
      className="text-decoration-none my-1 coin mx-1"
    >
      <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark my-1">
        <img className="coinlist-image" src={coin.image} alt="" />
        <span className="text-decoration-none">{coin.current_price}</span>
        <span
          className={
            coin.price_change_percentage_24h > 0
              ? "text-success mx-3"
              : "text-danger mx-3"
          }
        >
          {coin.price_change_percentage_24h > 0 ? (
            <i className="fas fa-sort-up align-middle mx-1"></i>
          ) : (
            <i className="fas fa-sort-down align-middle mx-1"></i>
          )}

          {coin.price_change_percentage_24h}
        </span>
        <i
          onClick={(e) => {
            e.preventDefault();
            deleteCoin(coin.id);
          }}
          className="delete-icon fas fa-times-circle text-danger mr-1"
        ></i>
      </li>
    </Link>
  );
};

export default Coin;
