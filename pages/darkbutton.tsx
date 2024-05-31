import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';


const App = () =>{
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = (checked: boolean) => {
      setDarkMode(checked);
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

export default App;