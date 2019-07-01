import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Page from '../components/page';

export const query = graphql`
  query($slug: String!) {
    marketingPage(slug: { eq: $slug }) {
      id
      slug
      title
      description
      # image
      content
    }
  }
`;

const PageTemplate = ({ data }) => (
  <Layout>
    <Page {...data.marketingPage} />
  </Layout>
);

export default PageTemplate;

// export default () => <p>test</p>;
