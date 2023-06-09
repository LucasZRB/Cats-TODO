import { FaPaw } from 'react-icons/fa';
import PawBack from './Cat_Paw_Back.png';
import PawFront from './Cat_Paw_Front.png';
import './CreateTodoButton.css';
import React from 'react';

function CreateTodoButton() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleClick = () => {
    setIsClicked(true);
    setIsTransitioning(true)
  }

  setTimeout(() => {
    setIsTransitioning(false);
  }, 500);

  setTimeout(() => {
    setIsClicked(false);
  }, 600)
  

  return (
    <>
      <button
        className="CreateTodoButton"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaPaw />
      </button>
      <img
        src={isClicked ? PawBack : PawFront}
        className={
          `Paw ${isHovered ? 'Paw-hover' : ''} ${isClicked ? 'Paw-click' : ''} ${isTransitioning ? 'Paw-touch' : ''}`
        }
      />
    </>
  );
}

export { CreateTodoButton };