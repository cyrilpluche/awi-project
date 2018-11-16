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
USER_MAIL_PWD=
USER_MAIL_SERVICE=gmail
DB_URI=postgresql://postgres@localhost:5432/prello
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_NAME=dgge5wv7n
CLOUDINARY_KEY=
CLOUDINARY_SECRET=

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