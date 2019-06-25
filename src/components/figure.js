import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';

const Figure = ({ node }) => {
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 540 },
    {
      projectId: process.env.GATSBY_SANITY_PROJECT_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
    },
  );

  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
    </figure>
  );
};

export default Figure;
