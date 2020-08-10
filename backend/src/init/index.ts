import { establishDBConnection } from './createConnection'

export default function loadAllDependencies() {
  return Promise.all([
    establishDBConnection()
  ])
}
