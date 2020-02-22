import { useEffect } from 'react';

const addBodyClass = className => document.body.classList.add(className);
const removeBodyClass = className => document.body.classList.remove(className);

const reactUtils = {
  useBodyClass: (className) => {
    useEffect(
      () => {
        // Set up
        className instanceof Array ? className.map(addBodyClass) : addBodyClass(className);

        // Clean up
        return () => {
          className instanceof Array
            ? className.map(removeBodyClass)
            : removeBodyClass(className);
        };
      },
      [className]
    );
  }
};

export default reactUtils;
