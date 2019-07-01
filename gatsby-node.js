exports.sourceNodes = ({ actions, schema }) => {
  // actions.createTypes(`
  //   type GenericPage implements Node @dontInfer {
  //     title: String!
  //     slug: String!
  //     image: String!
  //     description: String!
  //     content: JSON!
  //   }
  // `);

  actions.createTypes(
    schema.buildObjectType({
      name: 'GenericPage',
      interfaces: ['Node'],
      fields: {
        id: { type: 'ID!' },
        title: {
          type: 'String!',
          resolve: source => source.seo.title,
        },
        slug: {
          type: 'String!',
          resolve: source => source.slug.current,
        },
        image: {
          type: 'String!',
          resolve: async (source, _args, context) => {
            const image = await context.nodeModel.getNodeById({
              id: source.seo.image.asset._ref,
            });

            return `${image.url}?w=1280&h=686&fit=crop`;
          },
        },
        description: {
          type: 'String!',
          resolve: source => source.seo.description,
        },
        content: {
          type: 'String!',
          resolve: async (source, _args, context, info) => {
            console.log(source);
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['body'].resolve;

            // const content = await resolver(mdxNode, {}, context, {
            //   fieldName: 'mdx',
            // });

            return JSON.stringify({ test: 'content' });
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
    id: createNodeId(`GenericPage-${node.id}`),
    mdx: node.mdx || null,
  };

  const mdNode = {
    ...data,
    parent: node.id,
    internal: {
      type: 'GenericPage',
      mediaType: 'text/markdown',
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  };

  actions.createNode(mdNode);
  actions.createParentChildLink({ parent: node, child: mdNode });
};

// exports.createResolvers = ({ createResolvers, createNodeId }) => {
//   const getImage = async (id, context) => {
//     const image = await context.nodeModel.getNodeById({ id });
//     return `${image.url}?w=1280&h=686&fit=crop`;
//   };

//   const sanityToGeneric = (page, context) => {
//     const image = getImage(page.seo.image.asset._ref, context);

//     return {
//       id: createNodeId(`GenericPage-${page.id}`),
//       title: page.seo.title,
//       slug: page.slug.current,
//       description: page.seo.description,
//       content: page._rawDataContent,
//       image,
//     };
//   };

//   createResolvers({
//     Query: {
//       page: {
//         type: 'GenericPage',
//         args: {
//           slug: 'String!',
//         },
//         async resolve(_source, args, context) {
//           const page = await context.nodeModel.runQuery({
//             query: {
//               filter: {
//                 slug: { current: { eq: args.slug } },
//               },
//             },
//             type: 'SanityPage',
//             firstOnly: true,
//           });

//           const mdx = await context.nodeModel.getNodeById(page.children[0]);
//           console.log(page.children);

//           return sanityToGeneric(page, context);
//         },
//       },
//       allPage: {
//         type: 'GenericPageConnection!',
//         async resolve(_source, _args, context) {
//           const pages = await context.nodeModel.getAllNodes({
//             type: 'SanityPage',
//           });

//           return {
//             nodes: pages.map(page => sanityToGeneric(page, context)),
//           };
//         },
//       },
//     },
//   });
// };

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
