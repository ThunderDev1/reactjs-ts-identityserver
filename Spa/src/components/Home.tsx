import * as React from 'react';
import {FunctionComponent, ReactElement, Fragment} from 'react';

const Home: FunctionComponent<{}> = (): ReactElement => (
  <Fragment>
    <div>Welcome to the ultimate react boilerplate from the futur!</div>
    <ul>
      <li>React</li>
      <li>TypeScript</li>
      <li>Webpack</li>
      <li>React router</li>
      <li>EsLint</li>
      <li>Prettier</li>
    </ul>
  </Fragment>
);

export default Home;
