var express = require('express')
var winston = require('winston')

module.exports = function(){
  var _xapp = express()
  var _name = "noname"
  var _logger = new (winston.Logger)({
    level: 'debug',
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log/rezt.log' })
    ]
  })

  var _initialize = function(name, options){
    _name = name.toLowerCase();
    _logger.debug("Initialized '"+_name+"'")

    if (options != undefined && typeof options == "object"){
      if (options.logger != undefined){
        _logger = new (winstong.Logger)(options.logger)
      }
    }
  }

  var _addRouter = function(name, handlers){
    var addMethod = function(method, handler){
      if (typeof handler == "function"){
        if (name.endsWith("/")){
          name = name.slice(0,-1)
        }

        switch (method) {
          case "list":
            _xapp.get(name, handlers.list)
            break;
          case "retrieve":
            _xapp.get(name + "/:uid", handlers.retrieve)
            break;
          case "add":
            _xapp.post(name, handlers.add)
            break;
          case "modify":
            _xapp.put(name+ "/:uid", handlers.modify)
            break;
          case "remove":
            _xapp.delete(name + "/:uid", handlers.remove)
            break;
          default:
            _logger.warn("Unsupported method '"+method+"'.")
        }

      }else{
          _logger.warn(method.toUpperCase() + " method not implemented for '"+name+"' route. TypeOf handler is '"+typeof handler+"'.");
      }
    }

    if (handlers != undefined){
      addMethod("list", handlers.list)
      addMethod("retrieve", handlers.retrieve)
      addMethod("add", handlers.add)
      addMethod("modify", handlers.modify)
      addMethod("remove", handlers.remove)
    }
  }

  var _start = function(port){
    _xapp.listen(port)
  }

  return {
    initialize: _initialize,
    addRouter: _addRouter,
    start: _start
  }
}
