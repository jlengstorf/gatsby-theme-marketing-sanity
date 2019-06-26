import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Page from '../components/page';

export const query = graphql`
  query($slug: String!) {
    page(slug: $slug) {
      id
      slug
      title
      description
      image
      content
    }
  }
`;

const PageTemplate = ({ data }) => (
  <Layout>
    <Page {...data.page} />
  </Layout>
);

export default PageTemplate;
