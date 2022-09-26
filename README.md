# Newman Reporter CSV

Add CSV reports to your Newman runs.

## About

Each request in a collection run maps to a row in the outputted CSV file with the following columns:

| Column | Description | Example |
| ------ | ------ |  ------ |
| iteration | collection run iteration number | 1 |
| collectionName | name of the collection | My fancy API |
| requestName | name of the request made | Create user |
| method | HTTP method of the request | POST |
| url | URL of the request | http://localhost:3000/user/create |
| status | response status of the request | OK |
| code | response code of the request | 200 |
| responseTime | time taken to receive a response (ms) | 56 |
| responseSize | size of the response (bytes) | 130 |
| executed | test names that passed *(comma separated)* | Status was 200, User was created |
| failed | test names that failed *(comma separated)* | User has view permissions |
| skipped | test names that were skipped *(comma separated)* | User had first name Joe |
| body | the response body *(optional column. see [Options](#options))* | { foo: "bar" } |
| totalAssertions | Total number of test assertions on the request | 4 |
| passedCount | Total number of test assertions that passed | 2 |
| failedCount | Total number of test assertions that failed | 1 |
| skippedCount | Total number of test assertions that were skipped | 1 |

## Setup
Ensure you have Newman setup first:

```console
npm install newman --save-dev
```

Then install this package:

```console
npm install newman-reporter-csv --save-dev
```

## Usage
You can then use the `-r csv` option to make Newman use the CSV reporter.

```console
node_modules/.bin/newman run postman_collection.json -e postman_environment.json -r csv
```

## Options

| CLI Option | Description |
| ------ | ------ |
| --reporter-csv-export <path> | Specify a path where the output CSV file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |
| --reporter-csv-includeBody | If you wish to save the response body for each request, use this option. |
| --reporter-csv-includeDate | If you wish to save the UTC datetime in ISO format for each request, use this option. |

```console
node_modules/.bin/newman run postman_collection.json -e postman_environment.json -r csv --reporter-csv-includeBody
```
