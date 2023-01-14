import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const getElementsByTextContents = require('get-elements-by-text-contents');
const { Configuration, OpenAIApi } = require("openai");

 const configuration = new Configuration({
   apiKey: "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",
 });
const openai = new OpenAIApi(configuration);

async function get_resp(txt: any, to: any) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `translate "${txt}" to "${to}" be extremely thorough`,
        temperature: 1,
        max_tokens: 150,
    });
    console.log(response);
    return response;
}




// Find your targets

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #c2c2c2;
  z-index: 999999999;
  }
`;


var divs = document.getElementsByTagName("div");
var textItems = getElementsByTextContents("");



function getTextNodes(element: any) {
  var textNodes: any[] = [];

  if (element.nodeType == 3) {
    textNodes.push(element);
  } else {
    var children = element.childNodes;
    for (var i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodes(children[i]));
    }
  }
  return textNodes;
}

function getTextNodesIn(elem: any, opt_fnFilter: any) {
  var textNodes: any[] = [];
  if (elem) {
    for (var nodes = elem.childNodes, i = nodes.length; i--;) {
      var node = nodes[i], nodeType = node.nodeType;
      if (nodeType == 3) {
        if (!opt_fnFilter || opt_fnFilter(node, elem)) {
          textNodes.push(node);
        }
      }
      else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
        textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
      }
    }
  }
  return textNodes;
}


var menu = document.body;
// var items = getTextNodesIn(element);

getTextNodesIn(menu, function(textNode: any, parent: any) {
  if (/^\s+$/.test(textNode.nodeValue)) {
    parent.removeChild(textNode);
  }
});

var items = getTextNodesIn(menu, false)
items = items.filter(u => u.textContent.length > 50 &&  !u.textContent.includes("{"));
items = items.reverse();

// var regex = new RegExp('\n|\s')
// var regex2 = new RegExp(/\s/g)
// items = items.filter(u => !regex.test(u.textContent) && !regex2.test(u.textContent))

// items = document.getElementsByTagName('p');

const translateParagraphs = async () => {

  for (var i = 0; i < items.length; i++) {

    const response = await get_resp(items[i].textContent, "gen-z speak");
    items[i].textContent = response.data.choices[0].text;
    console.log(items[i].textContent)

}
};
translateParagraphs();

// for (var i = 0; i < items.length; i++) {
//   //do something to each div like
//   // console.log(textItems[i].innerText);
//   var orginal = "";
//   var gpt = "";

//   items[i].textContent = "fuck";
// }


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
