import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSaleDetails } from "../api";
import { Carousel } from "react-responsive-carousel";

const SaleDetailPage = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSaleDetails(id);
      setDetails(data);
    };

    fetchData();
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sale-detail-page">
      <h1>Hotel Details</h1>
      <h2>{details.editorial.title}</h2>
      <p>{details.editorial.destinationName}</p>
      {details.photos.length > 0 && (
        <div className="carousel-container">
          <Carousel>
            {details.photos.map((photo, index) => (
              <div key={index}>
                <img
                  className="carousel-img"
                  src={photo.url}
                  alt={`${details.editorial.title}-${index}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}
      <div className="detail-box">
        <div>
          <h2>Hotel Details</h2>
          <p>{details.editorial.hotelDetails}</p>
        </div>
        <div>
          <h2>Price</h2>
          <p>{details.prices.leadRate.forDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailPage;
