require('dotenv').config
const config = require('./src/config/index')

const app = require('./src/app')

const port = process.env.PORT || 3004
app.listen(port,()=>console.log(`Ouvindo na porta ${port} ...`))