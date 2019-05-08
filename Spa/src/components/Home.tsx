import * as React from 'react';
import axios from 'axios';
import {useState} from 'react';

const Home = () => {
  const [apiResult, setApiResult] = useState('');
  const callApi = () => {
    // quick and dirty test for calling the api
    axios
      .get('http://localhost:5200/api/values')
      .then((response: any) => {
        console.log(response);
        setApiResult(JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        const {status, statusText} = error.response;
        setApiResult(`${status}: ${statusText}`);
      });
  };

  return (
    <div className="p-centered">
      <div className="empty">
        <div className="empty-icon">
          <i className="icon icon-people" />
        </div>
        <p className="empty-title h5">Try calling the API</p>
        <p className="empty-subtitle">Make sure the Identity Server and API are running.</p>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={() => callApi()}>
            Call API
          </button>
        </div>
        <pre className="code">
          <code>{apiResult}</code>
        </pre>
      </div>
      <div className="container my-2">
        This app is built with
        <span className="label label-secondary mx-1">react</span>
        <span className="label label-secondary mx-1">typescript</span>
        <span className="label label-secondary mx-1">webpack</span>
        <span className="label label-secondary mx-1">react-router</span>
        <span className="label label-secondary mx-1">spectre.css</span>
        <span className="label label-secondary mx-1">redux</span>
        <span className="label label-secondary mx-1">redux-oidc</span>
      </div>
    </div>
  );
};

export default Home;
