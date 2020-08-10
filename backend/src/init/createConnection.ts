import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { Video } from '../entity/Video'

export function establishDBConnection() {
  return createConnection().then(async connection => {
    console.log('🎉 Database Connection Established')
  })
  .catch(error => {
    console.log('error: ', error)
    console.error('***Probably the database is not already created***')
    throw new Error('Unable to connect to database')
  });

}