1. After pull from git => run "npm install"

2. Create a ".env" file inside Server folder. Copy these informations and complete with your configuration :

NODE_ENV=
DB_NAME=yourDbName
DB_USERNAME=yourDbUsername
DB_PASSWORD=yourDbPassword
DB_HOSTNAME=localhost
DB_PORT=yourDbPort
SERVER_URL=http://localhost
SERVER_PORT=3000
CLIENT_PORT=8080
JWT_SECRET=yourSecret
USER_MAIL_ADDRESS=awi.project.option1.g1@gmail.com
USER_MAIL_PWD=Polytech34
USER_MAIL_SERVICE=gmail

3. Generate sequelize models, run these commands :

(Only on the first time)
    npm install -g pg-generator
    pgen template sequelize -t sequelize-template

(Every time you change database structure)
    pgen exec sequelize-template -d db_name -u user -p password -t models

Don't forget to delete old "models" path and rename the new one "model" to "models"