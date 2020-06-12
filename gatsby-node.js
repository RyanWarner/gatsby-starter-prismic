const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and template data.
  const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            data {
              title {
                text
              }
            }
            id
            first_publication_date
            uid
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve('./src/components/PostTemplate/PostTemplate.js')

  // Create pages for each Post in Prismic.
  pages.data.allPrismicPost.edges.forEach((edge) => {
    console.log('edge.node.uid', edge.node.uid)
    createPage({
      path: `${edge.node.uid}`,
      component: postTemplate,
      context: {
        id: edge.node.id,
      },
    })
  })
}
