import { doWork } from './work.js'

let alertButton = document.querySelector('.js-alert-button')
let uiWorkButton = document.querySelector('.js-ui-work-button')
let workerWorkButton = document.querySelector('.js-worker-work-button')
let workAmountInput = document.querySelector('.js-work-amount-input')

uiWorkButton.addEventListener('click', () => doWork(Number(workAmountInput.value), 'UI'))
workerWorkButton.addEventListener('click', () => worker.postMessage(Number(workAmountInput.value)))

console.log('UI: creating Worker')
let worker = new Worker('./worker.js', { type: 'module' }) // classic
worker.addEventListener('message', async (event) => {
  if (event.data === 'ready') {
    console.log('UI: received ready message from Worker')
  }
})
console.log('UI: now listening to Worker')

function evaluateHardwarePerformance() {
  let start = performance.now()
  let eventLoopDuration

  setTimeout(() => {
    let end = performance.now()
    eventLoopDuration = end - start
    let eventLoopFactor = Math.max(Math.log10(eventLoopDuration), 1)
    let workAmount = 200000000 * navigator.hardwareConcurrency / eventLoopFactor

    console.log(workAmount);
    workAmountInput.value = workAmount
    workAmountInput.step = workAmount / 10
  }, 0)
}

evaluateHardwarePerformance()
