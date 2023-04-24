import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import parse from "html-react-parser";

import { fetchSaleDetails } from "../api";
import useFetchData from "../hooks/useFetchData";

const SaleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: details,
    isLoading,
    error,
  } = useFetchData(fetchSaleDetails, id);

  // Destructure 'details' object to get necessary data,
  // providing default values
  const {
    editorial: { destinationName, title } = {},
    photos,
    prices: { leadRate: { forDisplay } = {} } = {},
  } = details || {};

  const goBackToResult = () => {
    navigate(-1);
  };

  // this function is to parse hotel details and render them as HTML
  const renderHotelDetails = () => {
    return parse(details.editorial.hotelDetails);
  };

  if (error) {
    return <div>Oops! Something went wrong!</div>;
  }

  return (
    <div className="sale-detail-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {details && (
            <>
              <h1>Hotel Details</h1>
              <Link onClick={goBackToResult}>Go back</Link>
              <h1>{title}</h1>
              <p>{destinationName}</p>
              {photos && photos.length > 0 && (
                <div className="carousel-container">
                  <Carousel>
                    {photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          className="carousel-img"
                          src={photo.url}
                          alt={`${title}-${index}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
              <div className="detail-box">
                <div>
                  <h2>Hotel Details</h2>
                  <div className="hotel-details-content">
                    {renderHotelDetails()}
                  </div>
                </div>
                <div>
                  <h2>Price</h2>
                  <p>{forDisplay}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SaleDetailPage;
