# dseng

### david magnuson

`v0.1.0`

## api/

| method | url                     | action                     |
| ------ | ----------------------- | -------------------------- |
| AUTH   | /api/auth/[...nextauth] | next-auth for azureAD auth |
| GET    | /api/courses            | retrieve all courses       |
| POST   | /api/courses            | create new course          |
| GET    | /api/courses/:id        | get 'id' tutorial          |
| PUT    | /api/courses/:id        | update tutorial 'id'       |
| DELETE | /api/courses/:id        | delete tutorial 'id'       |

## pages

| url               | page description         |
| ----------------- | ------------------------ |
| /                 | home page                |
| /landing          | landing if not logged in |
| /courses          | courses page             |
| /courses/new      | create new course page   |
| /courses/:id      | course [id] page         |
| /courses/edit/:id | edit course [id] page    |
