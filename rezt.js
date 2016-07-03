var express = require('express')
var winston = require('winston')
var bodyParser = require('body-parser');

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

  _xapp.use(bodyParser.json())
  _xapp.use(bodyParser.text())

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
    var handleRequest = function(req, res, handler){
      var request = {}
      request.query = req.query
      request.body = req.body
      request.headers = req.headers
      request.url = req.url
      request.elementId = req.params.uid

      var response = handler(request)

      if (typeof response.code != "number"){
        response.code = 296
      }

      res.status(response.code).json(response.response)
    }

    var addMethod = function(method, handler){
      if (typeof handler == "function"){
        if (name.endsWith("/")){
          name = name.slice(0,-1)
        }

        switch (method) {
          case "list":
            _xapp.get(name, function(req, res){handleRequest(req,res,handlers.list)})
            break;
          case "retrieve":
            _xapp.get(name + "/:uid", function(req, res){handleRequest(req,res,handlers.retrieve)})
            break;
          case "add":
            _xapp.post(name, function(req, res){handleRequest(req,res,handlers.add)})
            break;
          case "modify":
            _xapp.put(name+ "/:uid", function(req, res){handleRequest(req,res,handlers.modify)})
            break;
          case "remove":
            _xapp.delete(name + "/:uid", function(req, res){handleRequest(req,res,handlers.remove)})
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
