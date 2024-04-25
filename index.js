import express from 'express'
import cors from 'cors'
import routers from './src/routers.js'


const port = process.env.PORT || 8000

const server = express()
server.use(routers)
server.use(cors())
server.use(express.json())

server.listen(port, () => {
  console.log('Server runing port : ', port)
})
