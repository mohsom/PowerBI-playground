import './App.css';

import * as React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';

import values from './secrets.json';

function App() {

  const [embedUrl, setEmbedUrl] = React.useState('');

  React.useEffect(() => {
    // Fetch the embed URL using the Power BI REST API
    const fetchEmbedUrl = async () => {
      const response = await fetch(
        `https://api.powerbi.com/v1.0/myorg/reports/${values.reportId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${values.accessToken}`, // Obtain the access token using your preferred method
          },
        }
      );

      const data = await response.json();
      console.log('data => ', data);
      const embedUrl = data.embedUrl;
      setEmbedUrl(embedUrl);
    };

    fetchEmbedUrl();
  }, []);

  return (
    <div className="App">
      <h1>Hello, PowerBI!</h1>

      {embedUrl &&
        <PowerBIEmbed
          embedConfig={{
            type: 'report',
            id: values.reportId,
            embedUrl: embedUrl,
            accessToken: values.accessToken,
          }}
          cssClassName="embedContainer"
          getEmbeddedComponent={(embeddedReport) => {
            console.log('Report embedded: ', embeddedReport);
          }}
        />}
    </div>
  );
}

export default App;