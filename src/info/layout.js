//src/info/layout.js

import React from 'react';

const AppLayout = ({ children }) => {
  document.title = 'React App'; // Set the document title

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default AppLayout;
