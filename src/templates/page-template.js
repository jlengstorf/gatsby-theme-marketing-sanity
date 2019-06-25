import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Page from '../components/page';

export const query = graphql`
  query($slug: String!) {
    page: sanityPage(slug: { current: { eq: $slug } }) {
      id
      slug {
        current
      }
      seo {
        title
        description
        image {
          asset {
            fixed(width: 1280, height: 686) {
              src
            }
          }
        }
      }
      _rawContent(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const PageTemplate = ({ data }) => {
  // Simplify the data a bit.
  const page = {
    id: data.page.id,
    slug: data.page.slug.current,
    title: data.page.seo.title,
    description: data.page.seo.description,
    image: data.page.seo.image.asset.fixed.src,
    content: data.page._rawContent,
  };

  return (
    <Layout>
      <Page {...page} />
    </Layout>
  );
};

export default PageTemplate;
