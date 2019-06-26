import React from 'react';
import { Styled } from 'theme-ui';
import PortableText from './portable-text';

const Page = props => {
  const { content, ...otherProps } = props;

  return (
    <>
      <h1>Plz shadow me!</h1>
      <p>
        Create a component in your site at{' '}
        <Styled.code>
          src/gatsby-theme-marketing-sanity/components/page.js
        </Styled.code>
        . You’ll get the following props:
      </p>
      <ul>
        {Object.keys(props).map(prop => (
          <li key={`prop-${prop}`}>{prop}</li>
        ))}
      </ul>
      <h2>Prop values for this page</h2>
      {Object.keys(otherProps).map(prop => (
        <React.Fragment key={`otherprop-${prop}`}>
          <label
            style={{ display: 'block', marginTop: 20 }}
            htmlFor={`prop-value-${prop}`}
          >
            <Styled.code>{prop}</Styled.code>
          </label>
          <input
            style={{ width: '100%', fontSize: 18, padding: 5 }}
            id={`prop-value=${prop}`}
            value={otherProps[prop]}
            readOnly
          />
        </React.Fragment>
      ))}
      <p>
        There is also a <Styled.code>content</Styled.code> prop which contains
        the following:
      </p>
      <PortableText blocks={props.content} />
    </>
  );
};

export default Page;
