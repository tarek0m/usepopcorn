import { useState, useCallback } from 'react';

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={toggleOpen}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}
