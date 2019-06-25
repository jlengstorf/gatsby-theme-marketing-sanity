// Sanity uses Portable Text, which adds extra complexity for displaying
// content. In order to apply theme styles to our output, we need to write a
// bunch of business logic in this component to detect “styles” and return
// React components for them.
import React from 'react';
import { Styled } from 'theme-ui';

const BlockRenderer = ({ node, children }) => {
  const style = node.style || 'normal';

  switch (style) {
    case 'h1':
      return <Styled.h1>{children}</Styled.h1>;

    case 'h2':
      return <Styled.h2>{children}</Styled.h2>;

    default:
      return <Styled.p>{children}</Styled.p>;
  }
};

export default BlockRenderer;
