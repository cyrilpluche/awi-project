1. After pull from git => run "npm install"

2. Create a ".env" file inside root folder. Copy these informations and complete with your configuration :

NODE_ENV=development
DB_NAME=prello
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_HOSTNAME=localhost
DB_PORT=5432
SERVER_URL=http://localhost
PORT=4200
CLIENT_PORT=3000
JWT_SECRET=Pavardinho
USER_MAIL_ADDRESS=awi.project.option1.g1@gmail.com
USER_MAIL_PWD=Polytech34
USER_MAIL_SERVICE=gmail
DB_URI=postgresql://postgres@localhost:5432/prello
GITHUB_CLIENT_ID=79b7fe764078e8f2995d
GITHUB_CLIENT_SECRET=fe4304bed1f4e9bce88d17629f61b1bd3fbf1a39

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