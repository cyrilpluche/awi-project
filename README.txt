1. After pull from git => run "npm install"

2. Create a ".env" file inside root folder. Copy these informations and complete with your configuration :

NODE_ENV=
DB_NAME=yourDbName
DB_USERNAME=yourDbUsername
DB_PASSWORD=yourDbPassword
DB_HOSTNAME=localhost
DB_PORT=yourDbPort
SERVER_URL=http://localhost
PORT=4200
CLIENT_PORT=8080
JWT_SECRET=yourSecret
USER_MAIL_ADDRESS=awi.project.option1.g1@gmail.com
USER_MAIL_PWD=Polytech34
USER_MAIL_SERVICE=gmail
MAIL_ID_CLIENT=735288017834-ki8u5pgl4oog11rd8t607scot8df1l2j.apps.googleusercontent.com
MAIL_SECRET=uuIMVIL3NDzm6SMXbx1aZNVB
MAIL_TOKEN=1/4uFiKldJEHJEbuSOCzIF4EcpMYX310crK3V1359_bNQ
GITHUB_CLIENT_ID=b81474afe67274ecc8b5
GITHUB_CLIENT_SECRET=c3e66dc7b859e5da4fce057438ca5d646023e026

3. Execute : cd server

4. Generate sequelize models, run these commands :

(Only on the first time)
    npm install -g pg-generator
    pgen template sequelize -t sequelize-template

(Every time you change database structure)
    pgen exec sequelize-template -d prello -u postgres -p postgres -t models

5. Generate GraphQL schemas
(Only on the first time)
    npm install -g sql-to-graphql

6. Build react app
    cd client
    npm install --only=dev && npm install && npm run build