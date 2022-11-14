import Hapi from '@hapi/hapi'
import routes from './controller/routes.js'

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })
  server.route(routes)

  await server.start()
  console.log('Server run')
}

init()
