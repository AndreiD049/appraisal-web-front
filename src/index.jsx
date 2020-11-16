import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';
import App from './components/app';

ReactDOM.render(
  <React.StrictMode>
    <DocumentTitle title="Admin Tools">
      <App />
    </DocumentTitle>
  </React.StrictMode>,
  document.getElementById('root'),
);
