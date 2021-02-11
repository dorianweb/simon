front :

### `cd front && npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

api :
cree la base de donnée ( changer potentiellement les id de connexion)

### `php bin/console doctrine:database:create`
### `php bin/console doctrine:migrations:migrate`
### `php/bin doctrine:fixtures:load`
### `cd api && php -S localhost:8000 -tpublic `

Runs the api in the development mode.\
