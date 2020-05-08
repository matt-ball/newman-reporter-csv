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
| executed | tests that passed | Status was 200, User was created |
| failed | tests that failed | User has view permissions |
| skipped | tests that were skipped | User had first name Joe |
| body | the raw response from request:response.text()  | {"raw":"data"} |

> *Note: test names are comma separated*

## Setup
Ensure you have Newman setup first:

```console
npm install newman --save-dev
```

Then install this (forked version), download and build local:



```console
npm install newman-reporter-csv --save-dev
```

You can then use the `-r csv` option to make Newman use the CSV reporter.


## Options
```console
    reporter-csv-export  ./out (sets path of output CSV) 
    reporter-csv-write-body=1  (includes response body in csv)
 ```
 
## Example 
```console 
newman run {the}.postman_collection.json   --reporter-csv-export .\out --reporter-csv-write-body 1    -r csv,cli  -e {the}.postman_environment.json  
```
