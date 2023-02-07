# Home Library Service

## Instalation

1. git clone git@github.com:DenisWilk/nodejs2022Q4-service.git

2. switch to develop branch

3. npm i

## Running application
```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization
```
npm run test
```

To run only one of all test suites
```
npm run test -- <path to suite>
```

To run all test with authorization
```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

