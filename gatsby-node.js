exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type GenericPage implements Node @dontInfer {
      title: String!
      slug: String!
      image: String!
      description: String!
      content: JSON!
    }
  `);
};

exports.createResolvers = ({ createResolvers, createNodeId }) => {
  const getImage = async (id, context) => {
    const image = await context.nodeModel.getNodeById({ id });
    return `${image.url}?w=1280&h=686&fit=crop`;
  };

  const sanityToGeneric = (page, context) => {
    const image = getImage(page.seo.image.asset._ref, context);

    return {
      id: createNodeId(`GenericPage-${page.id}`),
      title: page.seo.title,
      slug: page.slug.current,
      description: page.seo.description,
      content: page._rawDataContent,
      image,
    };
  };

  createResolvers({
    Query: {
      page: {
        type: 'GenericPage',
        args: {
          slug: 'String!',
        },
        async resolve(_source, args, context) {
          const page = await context.nodeModel.runQuery({
            query: {
              filter: {
                slug: { current: { eq: args.slug } },
              },
            },
            type: 'SanityPage',
            firstOnly: true,
          });

          return sanityToGeneric(page, context);
        },
      },
      allPage: {
        type: 'GenericPageConnection!',
        async resolve(_source, _args, context) {
          const pages = await context.nodeModel.getAllNodes({
            type: 'SanityPage',
          });

          return {
            nodes: pages.map(page => sanityToGeneric(page, context)),
          };
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allPage {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading pages', result.errors);
    result;
  }

  result.data.allPage.nodes.forEach(page => {
    actions.createPage({
      path: page.slug === 'home' ? '/' : page.slug,
      component: require.resolve('./src/templates/page-template.js'),
      context: {
        slug: page.slug,
      },
    });
  });
};
