const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/note.routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT ?? 7100

app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/note', routes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

async function start() {
  const {
    MONGO_INITDB_ROOT_USERNAME: username,
    MONGO_INITDB_ROOT_PASSWORD: password,
    MONGO_HOST: host,
  } = process.env
  const mongoUri = `mongodb://${username}:${password}@${host}/notes?authSource=admin`
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('mongodb started')
    app.listen(
      port,
      console.log.bind(console, `Server has been started on port ${port}`)
    )
  } catch (e) {
    console.log('mongodb connection error', e.message)
    console.log(e)
  }
}

start()




