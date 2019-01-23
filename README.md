# Newman Reporter CSV

## About

Each request in a collection run maps to a row in the outputted CSV file with the following columns:

| Column | Description | Example |
| ------ | ------ |  ------ |
| iteration | collection run iteration number | 1 |
| collectionName | name of the collection | My fancy API |
| requestName | name of the request made | Create user |
| method | HTTP method of the request | GET |
| url | URL of the request | http://localhost:3000/user/create |
| status | response status of the request | OK |
| code | response code of the request | 200 |
| responseTime | time taken to receive a response (ms) | 56 |
| responseSize | size of the response (bytes) | 130 |
| executed | tests that passed | Status was 200, User was created |
| failed | tests that failed | User has view permissions |
> *Note: test names are comma separated*

## Setup
Ensure you have Newman setup first:

```console
npm install newman --save-dev
```

Then install this package:

```console
npm install newman-reporter-csv --save-dev
```

You can then use the `-r csv` option to make Newman use the CSV reporter.
