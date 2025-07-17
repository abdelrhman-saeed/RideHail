import memjs from 'memjs'

const client = memjs.Client.create(process.env.MEMCACHED_HOST)

export default client
