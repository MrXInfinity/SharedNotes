import escapeHtml from "escape-html";
import { Text, Node } from "slate";

const useSerialize = (node: any) => {
    if (Array.isArray(node)) return node.map((n: any) => Node.string(n)).join('\n')
    if (typeof node === "string") return node
    return Node.string(node)
};

const useFormattedSerialize = (node: any) => {
    console.log(node)
    if (typeof node === "string") return node
if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    return string
  }

  const children = node.children.map((n: any) => useFormattedSerialize(n)).join('')

  switch (node.type) {
    case 'block-quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case `bulleted-list`:
      return `<ul>${children}</ul>`
    case "heading-one":
      return `<h1>${children}</h1>`
    case "heading-two":
      return `<h2>${children}</h2>`
    case "list-item":
      return `<li>${children}</li>`
    case "numbered-list":
        return `<ol>${children}</ol>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}
export {useSerialize, useFormattedSerialize}