import app from './app'
import { sequelize } from './database/database'
import { PORT } from './utils/config'

async function main  () {
  try {
    await sequelize.authenticate()
    console.log('Successful connection to the database')
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}\n`)
    })
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`)
  }
}

main()
