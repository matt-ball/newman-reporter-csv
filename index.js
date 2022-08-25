let log
const logs = []
const columns = [
  'iteration',
  'collectionName',
  'requestName',
  'method',
  'url',
  'status',
  'code',
  'responseTime',
  'responseSize',
  'executed',
  'failed',
  'skipped',
  'totalAssertions',
  'executedCount',
  'failedCount',
  'skippedCount'
]


const CSV = {
  stringify: (str) => {
    return `"${str.replace(/"/g, '""')}"`
  }
}

/**
 * Reporter that outputs basic logs to CSV (default: newman-run-report.csv).
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @param {String} options.includeBody - Whether the response body should be included in each row.
 * @returns {*}
 */
module.exports = function newmanCSVReporter (newman, options) {
  if (options.includeBody) {
    columns.push('body')
  }

  newman.on('beforeItem', (err, e) => {
    if (err) return

    log = {}
  })

  newman.on('beforeRequest', (err, e) => {
    if (err || !e.item.name) return
    const { cursor, item, request } = e

    Object.assign(log, {
      collectionName: newman.summary.collection.name,
      iteration: cursor.iteration + 1,
      requestName: item.name,
      method: request.method,
      url: request.url.toString(),
      totalAssertions: 0,
      executedCount: 0,
      failedCount: 0,
      skippedCount: 0
    })
  })

  newman.on('request', (err, e) => {
    if (err || !e.item.name) return
    const { status, code, responseTime, responseSize, stream } = e.response
    Object.assign(log, { status, code, responseTime, responseSize })

    if (options.includeBody) {
      Object.assign(log, { body: stream.toString() })
    }
  })

  newman.on('assertion', (err, e) => {
    const { assertion } = e
    const key = err ? 'failed' : e.skipped ? 'skipped' : 'executed'

    log[key] = log[key] || []
    log[key].push(assertion)

    log['totalAssertions']++
    log[`${key}Count`]++
  })

  newman.on('item', (err, e) => {
    if (err) return

    logs.push(log)
  })

  newman.on('beforeDone', (err, e) => {
    if (err) return

    newman.exports.push({
      name: 'csv-reporter',
      default: 'newman-run-report.csv',
      path: options.export,
      content: getResults()
    })

    console.log('CSV write complete!')
  })
}

function getResults () {
  const results = logs.map((log) => {
    const row = []

    Object.keys(log).forEach((key) => {
      const val = log[key]
      const index = columns.indexOf(key)
      const rowValue = Array.isArray(val)
        ? val.join(', ')
        : String(val)

      row[index] = CSV.stringify(rowValue)
    })

    return row.join(',')
  })

  results.unshift(columns.join(','))

  return results.join('\n')
}
