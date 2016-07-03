var rezt = require('./rezt.js')

var server = rezt();

var resourcesRouter = {}

resourcesRouter.list = (req, res) => {
  res.json({resources: "Method: 'List'"})
}

resourcesRouter.retrieve = (req, res) => {
  res.json({resources: "Method: 'Retrieve'"})
}

resourcesRouter.add = (req, res) => {
  res.json({resources: "Method: 'Add'"})
}

resourcesRouter.modify = (req, res) => {
  res.json({resources: "Method: 'Modify'"})
}

resourcesRouter.remove = (req, res) => {
  res.json({resources: "Method: 'Remove'"})
}

server.initialize("TestReztServer")
server.addRouter("/resources", resourcesRouter)
server.start(8008)
