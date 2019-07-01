exports.sourceNodes = ({ actions, schema }) => {
  actions.createTypes(
    schema.buildObjectType({
      name: 'MarketingPage',
      interfaces: ['Node'],
      fields: {
        id: { type: 'ID!' },
        title: { type: 'String!' },
        slug: { type: 'String!' },
        // image: {
        //   type: 'String!',
        //   resolve: async (source, _args, context) => {
        //     const image = await context.nodeModel.getNodeById({
        //       id: source.seo.image.asset._ref,
        //     });

        //     return `${image.url}?w=1280&h=686&fit=crop`;
        //   },
        // },
        description: { type: 'String!' },
        content: {
          type: 'String!',
          resolve: async (source, _args, context, info) => {
            const type = info.schema.getType('Mdx');
            const resolver = type.getFields()['body'].resolve;
            const mdxNode = context.nodeModel.getNodeById({
              id: source.children[0],
            });

            const content = await resolver(mdxNode, {}, context, {
              fieldName: 'body',
            });

            return content;
          },
        },
      },
    }),
  );
};

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type !== 'SanityPage') {
    return;
  }

  const data = {
    id: createNodeId(`MarketingPage-${node.id}`),
    title: node.seo.title,
    slug: node.slug.current,
    // image: ,
    description: node.seo.description,
  };

  const mdNode = {
    ...data,
    parent: node.id,
    internal: {
      type: 'MarketingPage',
      mediaType: 'text/markdown',
      content: node.mdx || '',
      contentDigest: createContentDigest(data),
    },
  };

  actions.createNode(mdNode);
  actions.createParentChildLink({ parent: node, child: mdNode });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMarketingPage {
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

  result.data.allMarketingPage.nodes.forEach(page => {
    actions.createPage({
      path: page.slug === 'home' ? '/' : page.slug,
      component: require.resolve('./src/templates/page-template.js'),
      context: {
        slug: page.slug,
      },
    });
  });
};
