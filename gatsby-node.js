exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allSanityPage {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading pages', result.errors);
    result;
  }

  result.data.allSanityPage.nodes.forEach(page => {
    actions.createPage({
      path: page.slug.current === 'home' ? '/' : page.slug.current,
      component: require.resolve('./src/templates/page-template.js'),
      context: {
        slug: page.slug.current,
      },
    });
  });
};
