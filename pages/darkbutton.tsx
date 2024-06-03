/** @jsxImportSource @emotion/react */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { lightTheme, darkTheme } from './_app.styles';
import { css } from '@emotion/react';

const ToggleButton = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={50}
    />
  );
};

export default ToggleButton;
