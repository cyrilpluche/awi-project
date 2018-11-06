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

3. Execute : cd server

4. Generate sequelize models, run these commands :

(Only on the first time)
    npm install -g pg-generator
    pgen template sequelize -t sequelize-template

(Every time you change database structure)
    pgen exec sequelize-template -d db_name -u user -p password -t models

5. Generate GraphQL schemas
(Only on the first time)
    npm install -g sql-to-graphql