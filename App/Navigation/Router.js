// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

var Routes = require('../Navigation/Routes');
var assign = require('object-assign');

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

var LoggedIn = {
  parse: function(host) {
    switch (host) {
      case 'dashboard':
        var dashboard = Routes.Dashboard();
        dashboard.parse = function(path) {
          switch(path) {
            case 'settings':
              return Routes.Settings();
            case 'post':
              return Routes.CreatePost();
            default:
              return null;
          };
        };
        return dashboard;
      default:
        return null;
    }
  }
};

var LoggedOut = {
  parse: function(host) {
    switch (host) {
      case 'signup':
        return Routes.SignUp();
      case 'login':
        return Routes.LogIn();
      default:
        return null;
    }
  }
};

// TODO: can we use https://github.com/visionmedia/page.js
var Router = {

  parse: function(str, loggedIn, defaulted) {
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
    var current = loggedIn ? LoggedIn : LoggedOut;
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
          else if (!route._notAddressable) {
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
      if (!defaulted) {
        return null;
      }
      else if (loggedIn) {
        return this.parse('dashboard', true);
      }
      else {
        return this.parse('signup', false);
      }
    }

    var found = {};
    // TODO: add query parameters to last item on stack
    found.currentPath = stack[stack.length - 1].routePath;
    found.path = stack;
    return found;
  }
};

module.exports = Router;
