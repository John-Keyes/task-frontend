## setup
- Create an env file in your project directory with these variables
```.env
#App is either in dev or prod mode.
MODE="dev"

#mysql variables
DB_HOST=""
DB_USER=""
DB_PWD=""
DB_PORT=
DB_NAME=""
DB_URL = ""

API_PORT=4040
CLIENT_PORT=3040
CLIENT_URL="http://localhost"
API_URL="http://localhost"
```

- Install the packages
```bash
npm install
```

- run this command after running the backend application in a separate terminal
```bash
npm run dev
```
