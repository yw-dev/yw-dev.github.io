import axios from 'axios'

export const queryParse = (search = window.location.search) => {
  if (!search) return {}
  const queryString = search[0] === '?' ? search.substring(1) : search
  const query = {}
  queryString
    .split('&')
    .forEach(queryStr => {
      const [key, value] = queryStr.split('=')
      /* istanbul ignore else */
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
    })

  return query
}

export const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}

export const axiosJSON = axios.create({
  headers: {
    'Accept': 'application/json'
  }
})

export const axiosGithub = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/json'
  }
})

export const getMetaContent = (name, content) => {
  /* istanbul ignore next */
  content || (content = 'content')
  /* istanbul ignore next */
  const el = window.document.querySelector(`meta[name='${name}']`)
  /* istanbul ignore next */
  return el && el.getAttribute(content)
}

export const formatErrorMsg = err => {
  let msg = 'Error: '
  if (err.response && err.response.data && err.response.data.message) {
    msg += `${err.response.data.message}. `
    err.response.data.errors && (msg += err.response.data.errors.map(e => e.message).join(', '))
  } else {
    msg += err.message
  }
  return msg
}

export const strLength = (str, len)=>{
  if(len <= 0) return str;
  if(str.length < len) return str;
  return str.slice(0, len)+"...";  
}


export const hasClassInParent = (element, ...className) => {
  /* istanbul ignore next */
  let yes = false
  /* istanbul ignore next */
  if (typeof element.className === 'undefined') return false
  /* istanbul ignore next */
  const classes = element.className.split(' ')
  /* istanbul ignore next */
  className.forEach((c, i) => {
    /* istanbul ignore next */
    yes = yes || (classes.indexOf(c) >= 0)
  })
  /* istanbul ignore next */
  if (yes) return yes
  /* istanbul ignore next */
  return element.parentNode && hasClassInParent(element.parentNode, className)
}

// 防止react异步任务内存泄漏问题
function inject_unmount (target) {
  // 改装componentWillUnmount,销毁的时候记录一下
  let next = target.prototype.componentWillUnmount
  target.prototype.componentWillUnmount = function(){
      if(next) next.call(this,...arguments)
      this.unmount = true   // 表示已经卸载
  }

  let setState = target.prototype.setState
  // 每次在执行setState之前都查看该组件是否已经销毁
  target.prototype.setState = function () {
      if(this.unmount) return  // 已经卸载的话就不执行
      this.setState.call(this,...arguments)
  }
}

export default inject_unmount

// react中图片延迟加载
export const lazyLoad = () => {  
  let lazyImages = Array.from(document.getElementsByClassName('lazy'));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (items) => {
          items.forEach((item) => {
              if(item.intersectionRatio > 0){
                  //console.log(item.target);
                  var img = item.target;
                  img.src = img.dataset.src;
                  observer.unobserve(img);
              }
          })
        }
    )
    lazyImages.forEach((item) => {
        observer.observe(item);
    })
  } else {
    let active = false;
    const scrollLoad = function() {
      if (active === false) {
        active = true;

        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");

              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", scrollLoad);
                window.removeEventListener("resize", scrollLoad);
                window.removeEventListener("orientationchange", scrollLoad);
              }
            }
          });
          active = false;
        }, 200);
      }
    }
    document.addEventListener("scroll", scrollLoad);
    window.addEventListener("resize", scrollLoad);
    window.addEventListener("orientationchange", scrollLoad);  
  }
}
