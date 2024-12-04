import './App.css';
import React, { useState } from 'react';

let autoPlay = null;

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const imgArr = 
  [
    './img/1.jpeg',
    './img/2.jpeg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpeg',
    './img/7.jpeg',
  ]
  
  function prevClick() {
    if (currentSlide === 0)
    setCurrentSlide(imgArr.length - 1)
    else
    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide - 1);
  }
  
  function nextClick() {
    setCurrentSlide((privCurrent) => (privCurrent + 1) % imgArr.length)
  }
  

  function startAuto() {
    if (!autoScrolling){
      setAutoScrolling(true)
      autoPlay = setInterval(nextClick, 1000);
    }
  }

  function stopAuto(){
    setAutoScrolling(false);
    clearInterval(autoPlay);
    autoPlay = null;
  }

  function autoScroll() {
    autoScrolling ? stopAuto() : startAuto();
  }


  return(
    <div className='app'>
      <Slider
        srcCurrentSlider = {imgArr[currentSlide]}
      />

      <Indicators
      imgArr = {imgArr}
      currentSlide = {currentSlide}
      />

      <Controls
      onPrevClick={prevClick}
      onNextClick={nextClick}
      onAutoScroll={autoScroll}
      autoScrolling={autoScrolling}
      />
    </div>
  )
}

function Slider({srcCurrentSlider}){
  return (
  <>
  <img src={srcCurrentSlider}></img>
  </>
  )
}

function Controls({onPrevClick, onNextClick, onAutoScroll, autoScrolling}) {
  return (
    <div className="controls">
      <button className="prev" onClick={onPrevClick}>Назад</button>
      <button className="next" onClick={onNextClick}>Вперёд</button>
      <button className="autoScroll" onClick={onAutoScroll}>
        {autoScrolling ? 'Отмена' : 'Старт'}
      </button>
    </div>
  );
}

function Indicators({imgArr, currentSlide}) {
  return (
    <div className='indicators'>
      {imgArr.map((img, index) => (
        <div className='indicator'
          style={{
          backgroundColor:currentSlide === index ? 'black' : 'gray'}}>
           
        </div>
      ))}
    </div>
  )
}

export default App;
