/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require("prismjs/themes/prism-solarizedlight.css")

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `网站有新数据更新. ` +
        `是否加载最新的数据?`
    )
  
    if (answer === true) {
      window.location.reload()
    }
  }