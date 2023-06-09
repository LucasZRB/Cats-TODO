import React, { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './Presentation.css';
import OwnerCat from './GatoMono.jpg'

const dialogues = [
  [
    "Mm, I see you don't have any saved tasks",
    'Let me give you a paw with that!'
  ],
  [
    "First! Click in the paw",
    "Yes! The one at the bottom right. Click it!"
  ],
  [
    "Prrh! Great! You completed your tasks",
    "Let me recommend some tasks"
  ],
  [
    "Awesome! You completed the tasks I gave you",
    "Let me reward you with this!"
  ]
];

function Presentation() {
  useEffect(() => {
    const button = document.querySelector('.CreateTodoButton');
    const paw = document.querySelector('.Paw');
    if (dialogueIndex === 1) {
      handleAnimationStart();
      button.classList.add('Tutorial-Button');
      paw.classList.add('Tutorial-Paw');
    } else {
      button.classList.remove('Tutorial-Button');
      paw.classList.remove('Tutorial-Paw');
    }
  })

  const spinArrowRef = React.useRef(null);

  const addSpinHide = () => spinArrowRef.current.classList.add('SpinArrow--hide');
  const removeSpinHide = () => spinArrowRef.current.classList.remove('SpinArrow--hide');
  const startSpin = () => spinArrowRef.current.classList.add('SpinArrow--round');
  const stopSpin = () => spinArrowRef.current.classList.remove('SpinArrow--round');
  const startSpinRow = () => spinArrowRef.current.children[0].classList.add('svgSpin');
  const stopSpinRow = () => spinArrowRef.current.children[0].classList.remove('svgSpin');
  const startMoved = () => spinArrowRef.current.classList.add('SpinArrow--moved');
  const stopMoved = () => spinArrowRef.current.classList.remove('SpinArrow--moved');
  const startOut = () => spinArrowRef.current.classList.add('SpinArrow--out');
  const stopOut = () => spinArrowRef.current.classList.remove('SpinArrow--out');

  const handleAnimationStart = () => {
    removeSpinHide();
    startSpin();
    setTimeout(() => {
      stopSpin();
      startMoved();
    }, 2000);
  };

  const handleAnimationStop = () => {
    stopSpin();
    stopMoved();
    startSpinRow();
    startOut();
    setTimeout(() => {
      stopSpinRow();
      stopOut();
      addSpinHide();
    }, 2000);
  };

  const [isBlocked, setIsBlocked] = React.useState(true);
  const [dialogueIndex, setDialogueIndex] = React.useState(0);

  const handleNextDialogue = () => {
    if (dialogueIndex < 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setIsBlocked(false);
    }
  }

  return (
    <div className="Welcome">
      {isBlocked && (
        <div className="overlay">
          <div className={`overlay__container ${isBlocked ? 'active' : ''}`}>
            <img className="overlay__img" src={OwnerCat} />
            <div className="overlay__message">
              <h2 className="overlay__title">Welcome</h2>
              {dialogues[dialogueIndex].map((dialogue, index) => (
                <p className="overlay__description" key={index}>
                  {dialogue}
                </p>
              ))}
            </div>
            {dialogueIndex === 0 && (
              <button
                className="overlay__button"
                onClick={handleNextDialogue}
              >
                Next
              </button>
            )}
          </div>
          <div>
            <div className='SpinArrow SpinArrow--hide' ref={spinArrowRef}>
              <AiOutlineArrowRight />
            </div>
            <button onClick={handleAnimationStart} style={{ position: 'absolute', top: 0, left: 0 }}>Iniciar animación</button>
            <button onClick={handleAnimationStop} style={{ position: 'absolute', top: 0, left: 120 }}>Detener animación</button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Presentation };

/*
Welcome

Mm, I see you don't have any saved tasks
Let me give you a paw with that!
*/

/*
First! Click in the paw
Yes! The one at the bottom right. Click it!
*/

/*
Prrh! Great! You completed your tasks
Let me recommend some tasks
*/

/*
Awesome! You completed the tasks I gave you
Let me reward you with this!
*/