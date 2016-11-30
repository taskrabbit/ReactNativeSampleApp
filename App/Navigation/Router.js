// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

import Routes from '../Navigation/Routes';
import assign from 'object-assign';

function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};

parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

// TODO: can we use https://github.com/visionmedia/page.js
var Router = {

  parse: function(str, parent, defaulted) {
    if (!str) {
      str = "";
    }

    var toParse = str.toLowerCase();
    if (toParse.indexOf("://") < 0) {
      toParse = "sample://" + str;
    }
    var parsed = parseUri(toParse);
    var pieces = parsed.path.split("/");
    pieces.unshift(parsed.host);
    pieces = pieces.filter(function(v) { return v && v.length > 0 });
    var current = parent;
    var stack = [];

    for(var i=0; i < pieces.length; i++) {
      var piece = pieces[i];
      if (piece.length > 0) {
        if (!current.parse) {
          if(defaulted) {
            break; // as deep as we can
          }
          else {
            return null;
          }
        }
        var route = current.parse(piece);
        if (route) {
          if (current.routePath) {
            route.routePath = current.routePath + "/" + piece;
          }
          else {
            route.routePath = piece;
          }
          
          if (route._routerReplace) {
            stack[stack.length-1] = route;
          }
          else if (route._notAddressable) {
            if (route._routerAppend && i === (pieces.length-1)) {
              // add soemthing to route on the last one (kind of like a forward)
              var child = route.parse(route._routerAppend);
              child.routePath = route.routePath + "/" + route._routerAppend;
              route = child;
              stack.push(route);
            }
          }
          else {
            if (route._routerAppend && i === (pieces.length-1)) {
              // add soemthing to route on the last one (kind of like a forward)
              route.routePath = route.routePath + "/" + route._routerAppend;
            }
            stack.push(route);
          }
          current = route; // recursive
        }
        else if(defaulted) {
          break; // as deep as we can
        }
        else {
          return null;
        }
      }
    }

    if (stack.length === 0) {
      return null;
    }

    var found = {};
    // TODO: add query parameters to last item on stack
    found.index  = stack.length - 1;
    for(var j=0; j < stack.length; j++) {
      stack[j].key = stack[j].routePath;
    }
    found.routes = stack;
    return found;
  }
};

export default Router;
