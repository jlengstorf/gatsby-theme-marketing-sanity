import React from 'react';
import BasePortableText from '@sanity/block-content-to-react';
import { Styled } from 'theme-ui';
import BlockRenderer from './block-renderer';
import Figure from './figure';

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={{
      marks: {
        code: Styled.code,
      },
      types: {
        // if you want to change headings, etc., you have to edit this component
        block: BlockRenderer,
        'page-image': Figure,
      },
      // For a full list of magic types that don’t go in the `types` object,
      // see: https://github.com/sanity-io/block-content-to-react#proptypes
      list: Styled.ul,
      listItem: Styled.li,
    }}
    projectId={process.env.GATSBY_SANITY_PROJECT_ID}
    dataset={process.env.GATSBY_SANITY_DATASET}
  />
);

export default PortableText;
