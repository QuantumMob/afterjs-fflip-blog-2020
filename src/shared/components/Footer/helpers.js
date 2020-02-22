const footerToggle = ({ footertRef, footerWidgetRef }) => {
  if (typeof window !== 'undefined' && footerWidgetRef && footerWidgetRef.current) {
    footerWidgetRef && footerWidgetRef.current && footerWidgetRef.current.classList.toggle('footer--toggle');
    footertRef && footertRef.current && footertRef.current.classList.remove('footer--is-open');
    if (footerWidgetRef.current.classList.contains('footer--toggle') && footertRef.current) {
      footertRef.current.classList.add('footer--is-open');
      // not SCSS $break-large break point
      if (!window.matchMedia('screen and (min-width: 575px)').matches) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }
};
const topHandler = (ev) => {
  if (typeof window !== 'undefined') {
    window.scroll(0, 0);
    ev.currentTarget.blur(); // un blur what was clicked
  }
};

const buttonFactory = (footertRef) => (buttonData, ev) => {
  const { ident, footerWidgetRef } = buttonData;
  if (ident === 'top') {
    return topHandler(ev);
  }
  if (ident === 'open-footer') {
    return footerToggle({ footertRef, footerWidgetRef });
  }
  if (ident === 'close-footer') {
    return footerToggle({ footertRef, footerWidgetRef });
  }

  return true;
};

export default buttonFactory;
export { footerToggle, topHandler };
