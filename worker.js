console.log('Worker: starting to be evaluated')

import { doWork } from './work.js'

self.addEventListener('message', (event) => {
  let workAmount = event.data
  doWork(workAmount, 'Worker')
})

console.log('Worker: now listening to main thread')
console.log('Worker: sending ready message')
self.postMessage('ready')
