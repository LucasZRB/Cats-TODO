import { useEffect } from 'react';

function TimeCicle() {
  useEffect(() => {
    const root = document.querySelector('body');

    const timeCicle = {
      morning: 'timed-morning',
      afternoon: 'timed-afternoon',
      night: 'timed-night'
    };

    const localTime = new Date().getHours();

    if (localTime >= 5 && localTime < 16) {
      root.classList.remove(timeCicle.night);
      root.classList.add(timeCicle.morning);
    } else if (localTime >= 16 && localTime < 19) {
      root.classList.remove(timeCicle.morning);
      root.classList.add(timeCicle.afternoon);
    } else {
      root.classList.remove(timeCicle.afternoon);
      root.classList.add(timeCicle.night);
    }
  }, []);

  return null;
}

export { TimeCicle };
