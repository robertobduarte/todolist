# Setup
## 1 - Install the NODE.JS v12.x
* To manage different versions of Node.js use the [Node Version Manager - nvm](https://github.com/creationix/nvm).

* After installing npm, install the specific version of the js node:
```sh
nvm install v12
```

* To use v12.x on the terminal the project will be run, run the following command:
```sh
nvm use v12
```

## 2.1 - Install dotenv cli dependency
- This dependency is used to load the file .env on running the this API
```sh
npm install dotenv-cli -g
```

## 2.2 - Install nodemon dependency
- This dependency is used to load debugger in vscode
```sh
npm install -g nodemon
```

## 3 - Environments to running local
### 3.1 Create file .env 
```sh
> touch .env
```
### 3.2 Add environments on file .env
```
# Logs environment variables
LOG_INFO_ENABLE=true
LOG_WARN_ENABLE=true
LOG_ERROR_ENABLE=true
LOG_AUDIT_ENABLE=true

# Database environment variables
DB_READ_HOST=
DB_WRITE_HOST=
DB_PORT=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
```

## 4 - Install NPM the dependencies
```sh
npm install
```

## 5 - Running local
```sh
> npm run local
```

## Dependencies
    MysqlServer
```
