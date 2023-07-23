
# Ngomen 

Ngomen project backend documentation

## Deployment
Deployment link: https://ngomenapi.vercel.app


## Run Locally

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server
```bash
  http://localhost:8000
```

## Technology

- Nodejs
- MongoDB
- Express
- mongoose
- body-parser
- cors 
- dotenv
- jsonwebtoken


## API Reference

### USER

#### Login (All Role)
```http
  POST /user/login
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. google e-mail account |
| `googleId` | `string` | **Required**. google email account id |
| `name` | `string` | **Required**. google email account name |
| `profile` | `string` | **Required**. google email account profile(link) |


### Movie

#### Add Movie Review (All User)
```http
  POST /filmRev/add_comment
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required** user id|
| `rate` | `string` | **Required**. movie rating between 1.0 - 10.0 |
| `comment` | `string` | **Required**. movie comment, review, critiques description |
| `movie_id` | `string` | **Required**. movie id |
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login|

#### Get All Movie Review Data (All User)
```http
  GET /filmRev/getAll
```

#### Edit Movie Review (Only Admin)
```http
  PUT /filmRev/update_filmReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** review id|
| `user_id` | `string` | **Optional** user id|
| `rate` | `string` | **Optional**. movie rating between 1.0 - 10.0 |
| `comment` | `string` | **Optional**. movie comment, review, critiques description |
| `movie_id` | `string` | **Optional**. movie id |
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login **only admin** |


#### Delete Movie Review (Only Admin)
```http
  DELETE /filmRev/delete_filmReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** review id|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login **only admin** |

#### Check Permission User to Review Movie (All User)
```http
  POST /filmRev/checkReview
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required** user id|
| `movie_id` | `string` | **Required**. movie id |

**one user one review on each movie**

#### Get  Movie Review Data By ID (All User)
```http
  GET /filmRev/find_movReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** review id|


#### Get  Movie Review Data By Movie ID (All User)
```http
  POST /filmRev/findByMovieId
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movie_id` (params) | `string` | **Required** movie id|

#### Get Movie Review Data By User ID (All User)
```http
  POST /filmRev/findByUserId
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` (params) | `string` | **Required** user id|


### Music

#### Add Music Review (All User)
```http
  POST /musicRev/add_comment
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required** user id|
| `rate` | `string` | **Required**. music rating between 1.0 - 10.0 |
| `comment` | `string` | **Required**. music comment, review, critiques description |
| `track` | `string` | **Required**. name of track music|
| `artist` | `string` | **Required**. name of artist|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login|

#### Get All Music Review Data (All User)
```http
  GET /musicRev/getAll
```

#### Edit Music Review (Only Admin)
```http
  PUT /musicRev/update_musReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id (params)` | `string` | **Required** review id|
| `user_id` | `string` | **Optional** user id|
| `rate` | `string` | **Optional**. music rating between 1.0 - 10.0 |
| `comment` | `string` | **Optional**. music comment, review, critiques description |
| `track` | `string` | **Optional**. name of track music|
| `artist` | `string` | **Optional**. name of artist|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login **only admin**|


#### Delete Music Review (Only Admin)
```http
  DELETE /musicRev/delete_musReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** review id|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login **only admin** |

#### Check Permission User to Review Music (All User)
```http
  POST /musicRev/checkReview
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required** user id|
| `track` | `string` | **Required**. name of track music|
| `artist` | `string` | **Required**. name of artist|

**one user one review on each music**

#### Get  Music Review Data By ID (All User)
```http
  GET /musRev/find_musReview/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** review id|


#### Get  Music Review Data By Music ID (All User)
```http
  POST /musRev/findByMusicId
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `track` | `string` | **Required**. name of track music|
| `artist` | `string` | **Required**. name of artist|

#### Get Music Review Data By User ID (All User)
```http
  POST /musRev/findByUserId
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` (params) | `string` | **Required** user id|

## Contact

Reyhan Marsalino Diansa - [@reyhanmd._](https://instagram.com/reyhanmd._) - reyhandiansa@gmail.com - [linkedin](https://www.linkedin.com/in/reyhan-marsalino-diansa-02052a247/)

Project Link: [https://github.com/reyhandiansa/Ngomen](https://github.com/ReyhanDiansa/Ngomen/)