import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import parse from "html-react-parser";

import { fetchSaleDetails } from "../api";

const SaleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSaleDetails(id);
      setDetails(data);
    };
    fetchData();
  }, [id]);

  const goBackToResult = () => {
    navigate(-1);
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  const {
    editorial: { title, destinationName },
    photos,
    prices: {
      leadRate: { forDisplay },
    },
  } = details;

  const renderHotelDetails = () => {
    return parse(details.editorial.hotelDetails);
  };

  return (
    <div className="sale-detail-page">
      <h1>Hotel Details</h1>
      <Link onClick={goBackToResult}>Go back</Link>
      <h1>{title}</h1>
      <p>{destinationName}</p>
      {photos.length > 0 && (
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
          <div className="hotel-details-content">{renderHotelDetails()}</div>
        </div>
        <div>
          <h2>Price</h2>
          <p>{forDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailPage;
