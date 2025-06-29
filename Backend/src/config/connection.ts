import { PrismaClient } from '@prisma/client'
import { formatError } from '../utils/formError'

export const prisma = new PrismaClient()

const checkConnection = async () => {
  try {
    await prisma.$connect()
    console.log('[+] Connection succesfull database ORM (Prisma)')
  } catch (error) {
    console.log(formatError(error))
  }
}

process.on('SIGINT', async () => {
  console.log('\n[!] Exit connection to database')
  try {
    await prisma.$disconnect()
    console.log('[-] Prisma desconectado correctamente')    
    process.exit(0)
  } catch (error) {
    console.log(formatError(error))
    process.exit(1)
  }
})

checkConnection()