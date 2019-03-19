const path = require('path');
const createPaginatedPages = require('gatsby-paginate')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx');
    const categorPage = path.resolve('src/pages/categories.jsx');
    const categorPosts = path.resolve('src/templates/category.jsx');
    const specialPosts = path.resolve('src/templates/special.jsx');
    const specialPage = path.resolve('src/pages/specials.jsx');
    const archivePage = path.resolve('src/pages/archives.jsx');
    const resourcePage = path.resolve('src/pages/resource.jsx');

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
                  fields {
                    slug
                  }
                  frontmatter {
                    date(formatString: "YYYY-MM-DD")
                    path
                    title
                    discussionId 
                    tags
                    type
                    typeID
                    typeTitle
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
        const archives = {};
        // create tags page
        posts.forEach(({ node }) => {
          if (node.frontmatter.date) {
            var dates = node.frontmatter.date.split('-');
            if (!archives[dates[0]+'-'+dates[1]]) {
              archives[dates[0]+'-'+dates[1]] = [];
            }
            archives[dates[0]+'-'+dates[1]].push(node);
          }
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
        const allArchives = Object.keys(archives).sort((m, n) => {  
          return m.localeCompare(n);
        });

        const typesTags = {};
        const typesCategores = {};
        const categoryTags = {};
        
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
            if (!typesCategores[stype]) {
              typesCategores[stype] = [];
            }
            if (node.frontmatter.categores) {
              if (!typesCategores[stype][node.frontmatter.categores]) {
                typesCategores[stype][node.frontmatter.categores] = [];
              }
              typesCategores[stype][node.frontmatter.categores].push(node);
            }
          });
        });

        //create archive list
        allArchives.forEach(archive => {
            const list = archives[archive];  
            createPage({
              path: `/${archive}`,
              component: archivePage,
              context: {
                spath: `${archive}`,
                archive,
              },
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
          
          if(stype == "resource"){
            //create tags list
            createPage({
              path: '/' + stype,
              component: resourcePage,
              context: {
                spath: stype,
                list,
                tagName: stype,
              },
            });
          }else{
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
          }

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

          const categories = Object.keys(typesCategores[stype]);
          //create blog list by type
          categories.forEach(catName => {
            const list = typesCategores[stype][catName];
            if (!categoryTags[catName]) {
              categoryTags[catName] = [];
            }
            //create category's blog list by tag
            list.forEach(node => {
              node.frontmatter.tags.forEach(tagName => {
                if (!categoryTags[catName][tagName]) {
                  categoryTags[catName][tagName] = [];
                }
                categoryTags[catName][tagName].push(node);

                createPage({
                  path: `/${stype}/${catName}/${tagName}`,
                  component: categorPosts,
                  context: {
                    spath: `${stype}/${catName}/${tagName}`,
                    list,
                    tagName,
                  },
                });
              });
            });
          });

          //create blog list by dev
          allCategores.forEach(tagName => {
            const list = postsByCategory[tagName];
            if(stype == "resource"){
              //create tags list
              createPage({
                path: `/${stype}/${tagName}`,
                component: resourcePage,
                context: {
                  spath: `${stype}/${tagName}`,
                  list,
                  tagName,
                },
              });
            } else {
              createPage({
                path: `/${stype}/${tagName}`,
                component: categorPosts,
                context: {
                  spath: `${stype}/${tagName}`,
                  list,
                  tagName,
                },
              });
            }
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
        //create blog list by Categores
        allCategores.forEach(tagName => {
          const list = postsByCategory[tagName];

          //create category list
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
