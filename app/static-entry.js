import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Static from './static'

const createScriptTag = (script) => {
  return '<script type="text/javascript" src="/' + script + '"></script>'
}

module.exports = function (locals) {
  var html = ReactDOMServer.renderToString(React.createElement(Static, locals))
  return "<!DOCTYPE html><html><head><title>" + locals.title + "</title></head><body><div>" + html + '</div>' + createScriptTag(locals.script) + '</body></html>';
}
