import escapeHtml from "escape-html";
import { Text, Node } from "slate";

const useSerialize = (node: any) => {
    return node.map((n: any) => Node.string(n)).join('\n')

    // if (Text.isText(node)) {
    //   let string = escapeHtml(node.text);
    //   if (node.bold) {
    //     string = `<strong>${string}</strong>`;
    //   }
    //   return string;
    // }

    // const children = node.children
    //   .map((n: typeof node) => useSerialize(n))
    //     .join("");
    
    // return children

    // switch (node.type) {
    //   case "quote":
    //     return `<blockquote><p>${children}</p></blockquote>`;
    //   case "paragraph":
    //     return `<p>${children}</p>`;
    //   case "link":
    //     return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    //   default:
    //     return children;
    // }
};

export {useSerialize}