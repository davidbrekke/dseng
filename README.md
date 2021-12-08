# dseng

### david magnuson

`v0.1.0`

## environment variables

create .env file with the following variables

| var name                | description             | example                                    |
| ----------------------- | ----------------------- | ------------------------------------------ |
| NEXT_PUBLIC_api         | API endpoint            | http://localhost:3000/api                  |
| AZURE_AD_CLIENT_ID      | Client ID               |                                            |
| AZURE_AD_CLIENT_SECRET  | Client Secret           |                                            |
| AZURE_AD_TENANT_ID      | Tenant ID               |                                            |
| JWT_SIGNING_PRIVATE_KEY | JWT signing private key |                                            |
| NEXTAUTH_URL            | NextAuth URL            | http://localhost:3000                      |
| DATABASE_URL            | Database URL            | postgres://user:pass@localhost:5432/dbname |
| SHADOW_DATABASE_URL     | Shadow Database URL     | postgres://user:pass@localhost:5432/dbname |

## local environment

make sure to have [nodejs](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) installed

clone this repository to your local machine

- `git clone https://github.com/davidbrekke/dseng.git`
- `cd dseng`

install dependencies

- `yarn install`

create prisma client

- `yarn run prisma generate`

start dev server

- `yarn dev`

build for production

- `yarn build`

run the build

- `yarn start`

run eslint

- `yarn lint`

## vagrant environment

**_make sure to have [vagrant](https://www.vagrantup.com/) and [virtualbox](https://www.virtualbox.org/) installed_**

clone this repository to your local machine

- `git clone https://github.com/davidbrekke/dseng.git`
- `cd dseng`

checkout the `dev` branch

- `git checkout dev`

change into the vagrant directory

- `cd vagrant`

start the vagrant server

- `vagrant up`

ssh into the vagrant server

    - `vagrant ssh`

check the docker container

    - `sudo docker ps`

## pages

| url               | page description         | status |
| :---------------- | :----------------------- | :----: |
| /                 | home page                |        |
| /landing          | landing if not logged in |        |
| /courses          | courses page             |        |
| /courses/new      | create new course page   |        |
| /courses/:id      | course [id] page         |        |
| /courses/edit/:id | edit course [id] page    |        |
| /plans            | plans page by user       |        |
| /plans/:id        | plan page by [id]        |        |

## api/

| method | url                     | action                     | status |
| :----- | :---------------------- | :------------------------- | :----: |
| AUTH   | /api/auth/[...nextauth] | next-auth for azureAD auth |        |
|        |                         |                            |        |
| GET    | /api/courses            | get all courses            |        |
| POST   | /api/courses            | create new course          |        |
| GET    | /api/courses/:id        | get 'id' tutorial          |        |
| PUT    | /api/courses/:id        | update tutorial 'id'       |        |
| DELETE | /api/courses/:id        | delete tutorial 'id'       |        |
|        |                         |                            |        |
| GET    | /api/plans/             | get all plans              |        |
| POST   | /api/plans/             | create new plan            |        |
| GET    | /api/plans/:id          | get plan by id             |        |
| PUT    | /api/plans/:id          | update plan by id          |        |
| DELETE | /api/plans/:id          | delete plan by id          |        |
