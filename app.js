var rezt = require('./rezt.js')

var server = rezt();

var resourcesRouter = {}

resourcesRouter.list = (req) => {
  return {
    code: 200,
    response: {
      request: {
         url: req.url,
         query: req.query,
      },
      method: "list"
    }
  }
}

resourcesRouter.retrieve = (req) => {
  return {
    code: 200,
    response: {
      request: {
        elementId: req.elementId,
        url: req.url,
        query: req.query,
      },
      method: "retrieve"
    }
  }
}

resourcesRouter.add = (req) => {
  return {
    code: 200,
    response: {
      request: {
         url: req.url,
         body : req.body
      },
      method: "add"
    }
  }
}

resourcesRouter.modify = (req) => {
  return {
    code: 200,
    response: {
      request: {
         url: req.url,
         body : req.body
      },
      method: "modify"
    }
  }
}

resourcesRouter.remove = (req) => {
  return {
    code: 200,
    response: {
      request: {
         url: req.url,

      },
      method: "remove"
    }
  }
}

server.initialize("TestReztServer")
server.addRouter("/resources", resourcesRouter)
server.start(8008)
