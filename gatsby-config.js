module.exports = ({ sanity, basePath = '/' }) => ({
  siteMetadata: {
    title: 'Gatsby Marketing Theme',
    basePath,
  },
  __experimentalThemes: ['gatsby-theme-ui'],
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: sanity.projectId,
        dataset: sanity.dataset,
        token: sanity.token,
        overlayDrafts: sanity.overlayDrafts,
        watchMode: sanity.watchMode,
      },
    },
  ],
});
