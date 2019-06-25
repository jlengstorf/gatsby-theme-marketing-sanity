# Gatsby Theme for Marketing/Launch Sites

This is an ideal theme if you’re looking to set up simple pages on a site.

This theme currently relies on [Sanity.io](https://sanity.io); in the future we plan to add support for multiple back-ends.

## Installation

**IMPORTANT:** To set this site up, you’ll need a Sanity instance available and the GraphQL API deployed. See [the Theme Jam website source](https://github.com/gatsbyjs/themejam.gatsbyjs.org) for the expected page schema and the [Sanity source plugin for Gatsby](https://github.com/sanity-io/gatsby-source-sanity) for deployment details.

```sh
yarn add gatsby-theme-marketing-sanity
```

Create environment variables to identify which Sanity instance should be used for loading data. For development, add a file called `.env.development` to the root of your project and put this inside:

```sh
# get this at manage.sanity.io in your project’s settings
GATSBY_SANITY_PROJECT_ID=<projectId>
GATSBY_SANITY_DATASET=<dataset>
```

In your `gatsby-config.js`:

```diff
+ require('dotenv').config({
+   path: `.env.${process.env.NODE_ENV}`,
+ });

  module.exports = {
    plugins: [
+     {
+       resolve: 'gatsby-theme-marketing',
+       options: {
+         sanity: {
+           projectId: process.env.GATSBY_SANITY_PROJECT_ID,
+           dataset: process.env.GATSBY_SANITY_DATASET,
+           watchMode: true,
+         },
+       },
    ]
  }
```

