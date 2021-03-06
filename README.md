# dseng

### david magnuson

`v0.1.0`

## api/

| method | url                     | action                     |
| ------ | ----------------------- | -------------------------- |
| AUTH   | /api/auth/[...nextauth] | next-auth for azureAD auth |
|        |                         |                            |
| GET    | /api/courses            | get all courses            |
| POST   | /api/courses            | create new course          |
| GET    | /api/courses/:id        | get 'id' tutorial          |
| PUT    | /api/courses/:id        | update tutorial 'id'       |
| DELETE | /api/courses/:id        | delete tutorial 'id'       |
|        |                         |                            |
| GET    | /api/plans/             | get all plans              |
| POST   | /api/plans/             | create new plan            |
| GET    | /api/plans/:id          | get plan by id             |
| PUT    | /api/plans/:id          | update plan by id          |
| DELETE | /api/plans/:id          | delete plan by id          |
|        |                         |                            |
| GET    | /api/students           | get all students           |
| GET    | /api/students/:id       | get student by id          |

## pages

| url               | page description         |
| ----------------- | ------------------------ |
| /                 | home page                |
| /landing          | landing if not logged in |
| /courses          | courses page             |
| /courses/new      | create new course page   |
| /courses/:id      | course [id] page         |
| /courses/edit/:id | edit course [id] page    |
