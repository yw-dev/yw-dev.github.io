const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx');
    const categorPage = path.resolve('src/pages/categories.jsx');
    const categorPosts = path.resolve('src/templates/category.jsx');
    const specialPosts = path.resolve('src/templates/special.jsx');
    const specialPage = path.resolve('src/pages/Specials.jsx');

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  id
                  excerpt(pruneLength: 200)
                  html
                  frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    path
                    title
                    tags
                    type
                    categores
                    special
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        const postsByTag = {};
        const postsBySpecial = {};
        const postsByCategory = {};
        const postsByType = {};
        // create tags page
        posts.forEach(({ node }) => {
          if (node.frontmatter.type) {
            if (!postsByType[node.frontmatter.type]) {
              postsByType[node.frontmatter.type] = [];
            }
            postsByType[node.frontmatter.type].push(node);
          }
          if (node.frontmatter.special) {
              if (!postsBySpecial[node.frontmatter.special]) {
                postsBySpecial[node.frontmatter.special] = [];
              }
              postsBySpecial[node.frontmatter.special].push(node);
          }
          if (node.frontmatter.categores) {
            if (!postsByCategory[node.frontmatter.categores]) {
              postsByCategory[node.frontmatter.categores] = [];
            }
            postsByCategory[node.frontmatter.categores].push(node);
          }
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
              if (!postsByTag[tag]) {
                postsByTag[tag] = [];
              }
              postsByTag[tag].push(node);
            });
          }
        });

        const allTags = Object.keys(postsByTag).sort((m, n) => {  
          return m.localeCompare(n);
        });
        const allCategores = Object.keys(postsByCategory).sort((m, n) => {  
          return m.localeCompare(n);
        });
        const allTypes = Object.keys(postsByType).sort((m, n) => {  
          return m.localeCompare(n);
        });
        const allSpecials = Object.keys(postsBySpecial).sort((m, n) => {  
          return m.localeCompare(n);
        });

        const typesTags = {};
        const typesCategores = {};
        
        allTypes.forEach(stype => {
          postsByType[stype].map(node => {
            if (node.frontmatter.tags) {
              node.frontmatter.tags.forEach(tag => {
                if (!typesTags[tag]) {
                  typesTags[tag] = [];
                }
                typesTags[tag].push(node);
              });
            }
            if (node.frontmatter.categores) {
              if (!typesCategores[node.frontmatter.categores]) {
                typesCategores[node.frontmatter.categores] = [];
              }
              typesCategores[node.frontmatter.categores].push(node);
            }
          });
        });

        //create category list
        createPage({
          path: '/category',
          component: categorPage,
          context: {
            spath: "category",
            tags: allTags,
            categores: allCategores,
          },
        });

        allTypes.forEach(stype => {   
          const list = postsByType[stype];
          //create tags list
          createPage({
            path: '/' + stype,
            component: categorPosts,
            context: {
              spath: stype,
              list,
              tagName: stype,
            },
          });

          //create blog list for all tags
          allTags.forEach(tagName => {
            const list = postsByTag[tagName];
  
            createPage({
              path: `/${stype}/${tagName}`,
              component: categorPosts,
              context: {
                spath: `${stype}/${tagName}`,
                list,
                tagName,
              },
            });
          });
          //create blog list by dev
          allCategores.forEach(tagName => {
            const list = postsByCategory[tagName];
  
            createPage({
              path: `/${stype}/${tagName}`,
              component: categorPosts,
              context: {
                spath: `${stype}/${tagName}`,
                list,
                tagName,
              },
            });
          });
        });       

          //create blog list for all tags
          allTags.forEach(tagName => {
            const list = postsByTag[tagName];
  
            createPage({
              path: `/${tagName}`,
              component: categorPosts,
              context: {
                spath: tagName,
                list,
                tagName,
              },
            });
          });
          //create blog list by dev
          allCategores.forEach(tagName => {
            const list = postsByCategory[tagName];
  
            createPage({
              path: `/${tagName}`,
              component: categorPosts,
              context: {
                spath: tagName,
                list,
                tagName,
              },
            });
          });

        //create Specials list
        createPage({
          path: '/specials',
          component: specialPage,
          context: {
            specials: allSpecials.sort(),
            data: result.data,
          },
        });

        //create special-blog by special
        allSpecials.forEach(specialName => {
          const posts = postsBySpecial[specialName];

          createPage({
            path: `/specials/${specialName}`,
            component: specialPosts,
            context: {
              specialName,
            },
          });
        });

        //create posts
        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path;
          const prev = index === 0 ? null : posts[index - 1].node;
          const next = index === posts.length - 1 ? null : posts[index + 1].node;
          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path,
              spath: `blog`,
              prev,
              next,
            },
          });
        });
      })
    );
  });
};

/* Allows named imports */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
