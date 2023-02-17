# Home Library Service

## Instalation

1. git clone git@github.com:DenisWilk/nodejs2022Q4-service.git

2. switch to docker branch

3. npm i

## Running application with docker
```
npm run docker
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scanning application and database for vulnerabilities
```
npm run docker:scan
```

## Testing application

After application running open new terminal and enter:

```
npm run docker:test
```
