## Rest API Example

### Stack

- Hapi.js
- Sequelize

### Develop

Install dependencies
```bash
$ npm install
```

Copy `.env.example` to `.env` and set variables
```bash
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
SECRET=
```

if you don't know how to generate a secret key, you can get one here:
[https://www.grc.com/passwords.htm](https://www.grc.com/passwords.htm)


Run the server
```bash
$ node .
```

Or if you have nodemon
```bash
$ nodemon .
```

### Documentation

To generate documentation, install apidoc as global package
```bash
$ npm install -g apidoc
```

Run apidoc to generate
```bash
$ apidoc -i routes/ -o apidoc/
```

Documentation is available at apidoc folder
