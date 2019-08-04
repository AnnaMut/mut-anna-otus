function getPath(node) {

  const selector = (node) => {
    const index = Array.from(node.parentNode.children).indexOf(node)
    return `${node.nodeName.toLowerCase()}:nth-child(${index + 1})`
  }

  let pathArr = []
  const next = (node) => {
    if (!node.parentElement) {
      return node.nodeName.toLowerCase()
    }
    if (node.id) {
      return "#" + node.id
    }
    pathArr.push(selector(node))

    return next(node.parentElement)
  }

  let path = next(node)
  path += " > " + pathArr[pathArr.length - 1]
  return path;
}

