import React, { useState, useEffect } from "react";
import { AiFillCaretRight,AiFillCaretLeft } from 'react-icons/ai';
import {GiPauseButton} from 'react-icons/gi'
import {FaPlay} from 'react-icons/fa'

import './index.css'
const CatalogViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    ));
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === images.length -1 ? 0 : prevIndex + 1
    ))
  };

  const showImage = (index) => {
    setCurrentIndex(index);
    if (isPlaying) {
      setIsPlaying(false);
      setIsPlaying(true);
    }
  };

  return (
    <div className="app-container">
    <div className="catalog-container">
      <div className="image-details-container">
        <img src={images[currentIndex].imageUrl} alt={images[currentIndex].imageAltText} className="image"/>
        <div>
        <h1 className="image-name">{images[currentIndex].imageAltText}</h1>
        <p className="image-description">{images[currentIndex].description}</p>
        </div>
      </div>
      <div className="controls-container">
      <div className="thumbnails-container">
      <button onClick={showPreviousImage} className="button"><AiFillCaretLeft/></button>
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumbnailUrl}
            alt={image.thumbnailAltText}
            className={currentIndex === index ? "thumbnail active" : "thumbnail"}
            onClick={() => showImage(index)}
          />
        ))}
      </div>
      <button onClick={showNextImage} className="button"><AiFillCaretRight/></button>
      </div>
      <div>
      <button onClick={togglePlayPause} className="play-pause-button">
          {isPlaying ? <GiPauseButton/> : <FaPlay/>}
        </button>
        </div>
      
      </div>
    </div>
    </div>
  );
};

export default CatalogViewer;
