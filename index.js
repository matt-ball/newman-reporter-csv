/**
 * Reporter that simply dumps the summary object to file (default: newman-run-report.csv).
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @returns {*}
 */
module.exports = function newmanCSVReporter (newman, options) {
  let i = 1
  let results = ['Collection Name, Request Name, Method, URL, Status, Code, Response Time (ms), Response Size (B), Executed, Failed']

  newman.on('beforeRequest', (err, o) => {
    if (err) return
    const { item, request } = 0

    results[i] = []
    results[i][0] = newman.summary.collection.name
    results[i][1] = item.name
    results[i][2] = request.method
    results[i][3] = request.url.toString()
  })

  newman.on('request', (err, o) => {
    if (err) return
    const { response } = o

    results[i][4] = response.status
    results[i][5] = response.code
    results[i][6] = response.responseTime
    results[i][7] = response.responseSize
  })

  newman.on('assertion', (err, o) => {
    const key = err ? 9 : 8
    const firstAssertion = !results[i][key]
    const { assertion } = o

    if (firstAssertion) {
      results[i][key] = assertion
    } else {
      results[i][key] += ` :: ${assertion}`
    }
  })

  newman.on('item', (err, o) => {
    if (err) return

    results[i] = results[i].join(', ')
    i++
  })

  newman.on('beforeDone', (err, o) => {
    if (err) { return }

    newman.exports.push({
      name: 'csv-reporter',
      default: 'newman-run-report.csv',
      path: options.export,
      content: results.join('\n')
    })

    console.log('CSV write complete!')
  })
}
