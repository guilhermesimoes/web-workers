self.count = 0

function doWork(workAmount, source) {
  let start = Date.now()
  console.log(`${source}: work started`)

  for (let i = 0; i < workAmount; i++) {}

  let end = Date.now()
  let workDuration = Math.round(end - start)
  console.log(`${source}: work finished, took ${workDuration}ms`)
}
