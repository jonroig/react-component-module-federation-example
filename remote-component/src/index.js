import React from 'react';
import ReactDOM from 'react-dom/client';
import MyComponent from './MyComponent';

const App = () => (
  <div>
    <h1>This is the Component App (Exposing)</h1>
    <MyComponent />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);