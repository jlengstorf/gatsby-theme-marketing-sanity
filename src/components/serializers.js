import { Styled } from 'theme-ui';
import BlockRenderer from './block-renderer';
import Figure from './figure';

export default {
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
};
