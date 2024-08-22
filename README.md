## Getting Started

To get started with this project:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

# Task 1: Angular. Intro task

1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/intro.md)
2. Screenshot:
![image](img/1.1.png)
3. Score: 70 / 70

- [x] Generated a new Angular project using ng-cli `ng new`
- [x] Migrated Angular application to ESLint with rules AirBnB `npm i eslint-config-airbnb-base`: https://github.com/airbnb/javascript

1. `ng add @angular-eslint/schematics`
2. `npm i eslint-config-airbnb-typescript`
3. `npm i eslint-config-airbnb-base`
4. `npm i eslint-config-airbnb-typescript`
5. `npm i eslint-plugin-simple-import-sort`
6. Updated `.eslintrc.json`
7. Run `ng lint`

- [x] Generated all the necessary components using ng-cli.

```bash
ng generate module components/header
ng generate component components/header
ng generate component components/header/logo
ng generate component components/header/search-input
ng generate component components/header/search-button
ng generate component components/header/filter-button
ng generate component components/header/login-info

ng generate module components/header/filter
ng generate component components/header/filter
ng generate component components/header/filter/sort-buttons
ng generate component components/header/filter/word-filter-input

ng generate module components/search
ng generate component components/search
ng generate component components/search/search-item/
ng generate component components/search/search-results/
ng generate component components/search/search-item/video-thumbnail
ng generate component components/search/search-item/views-count
ng generate component components/search/search-item/likes-count
ng generate component components/search/search-item/dislikes-count
ng generate component components/search/search-item/comments-count
ng generate component components/search/search-item/more-button

ng generate class components/search/search-response.model --type=model
ng generate class components/search/search-item.model --type=model
```

- [x] Created necessary interfaces for YouTube client based on mocked JSON response stored in `.json` file
- [x] ESLint is configured for TypeScript, enabling the no-explicit-any rule.
- [x] TypeScript is configured with `strict: true` rule enabled.
