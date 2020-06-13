const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and content data.
  const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            data {
              title {
                text
              }
              content {
                html
              }
            }
            uid
            first_publication_date
            id
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve('./src/components/PostTemplate/PostTemplate.js')

  // Create pages for each Post in Prismic.
  pages.data.allPrismicPost.edges.forEach((edge) => {
    createPage({
      path: `${edge.node.uid}`,
      component: postTemplate,
      context: {
        ...edge.node,
      },
    })
  })
}
