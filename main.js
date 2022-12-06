import { doWork } from './work.js'

let alertButton = document.querySelector('.js-alert-button')
let uiWorkButton = document.querySelector('.js-ui-work-button')
let workerWorkButton = document.querySelector('.js-worker-work-button')

alertButton.addEventListener('click', showAlert)
uiWorkButton.addEventListener('click', () => doWork(workAmount, 'UI'))
workerWorkButton.addEventListener('click', () => worker.postMessage(workAmount))

function showAlert() {
  alert('You clicked me!')
}

let workAmount = 1000000000

function evaluateHardwarePerformance() {
  let start = performance.now()
  let eventLoopDuration

  setTimeout(() => {
    let end = performance.now()
    eventLoopDuration = end - start
    let eventLoopFactor = Math.max(Math.log10(eventLoopDuration), 1)
    workAmount = Math.round(200000000 * navigator.hardwareConcurrency / eventLoopFactor)
  }, 0)
}

evaluateHardwarePerformance()

console.log('UI: creating Worker')
let worker = new Worker('./worker.js', { type: 'module' }) // classic
worker.addEventListener('message', async (event) => {
  if (event.data === 'ready') {
    console.log('UI: received ready message from Worker')
  }
})
console.log('UI: now listening to Worker')
