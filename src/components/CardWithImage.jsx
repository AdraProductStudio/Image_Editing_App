import React, { useState } from "react";
import NaturalImage from "../components/images/test1.jpg";
import NaturalImage1 from "../components/images/test2.jpg";
import NaturalImage2 from "../components/images/test3.jpg";
import NaturalImage3 from "../components/images/test4.jpg";
import NaturalImage4 from "../components/images/test6.jpg";
import NaturalImage5 from "../components/images/test7.jpg";
import NaturalImage6 from "../components/images/test8.jpg";
import NaturalImage7 from "../components/images/natural.jpg";
import { FaEdit, FaSearch } from "react-icons/fa";

import Modal from "./Modal";

const CardWithImage = () => {
  const CardDetails = [
    {
      imageSource: NaturalImage7,
      cardTitle: "First Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage,
      cardTitle: "Second Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage1,
      cardTitle: "Third Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage2,
      cardTitle: "Fourth Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage3,
      cardTitle: "Fifth Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage4,
      cardTitle: "Sixth Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage5,
      cardTitle: "Seventh Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
    {
      imageSource: NaturalImage6,
      cardTitle: "Eighth Title",
      cardText:
        "This is a wider card with supporting text below as a natural lead-in to additional content",
    },
  ];

  // State to manage the visibility of each modal
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [search, setSearch] = useState("");
  // Function to handle modal visibility
  const handleModalToggle = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setShowModal(true);
  };

  return (
    <div className="container-fluid mt-5 pt-5">
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-grow-1 bd-highlight"></div>
        <div class="p-2 bd-highlight">
          <div class="input-group border-0 mb-3">
            <span class="input-group-text bg-white border-0" id="basic-addon1">
              <FaSearch />
            </span>
            <input
              type="text"
              class="form-control border-0 form-control-lg "
              placeholder="search title"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {CardDetails.filter(
          (card) =>
            card.cardTitle.toUpperCase().includes(search) ||
            card.cardTitle.toLowerCase().includes(search)
        ).map((data, index) => {
          return (
            <div className="col" key={index}>
              <div className="card h-100 rounded-4 border-0">
                <img
                  src={data.imageSource}
                  className="card-img-top rounded-5 p-3"
                  alt="..."
                  height={350}
                />
                <div className="card-body">
                  <h5 className="card-title">{data.cardTitle}</h5>
                  <p className="card-text">{data.cardText}</p>
                </div>

                <div className="card-footer bg-white border-top-0">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-secondary btn-sm editButton border-0 py-2"
                      onClick={() => handleModalToggle(data.imageSource)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                </div>
              </div>
              {<Modal imageSrc={modalImageSrc} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardWithImage;
