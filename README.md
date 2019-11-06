# aurora-api

## Project setup
```
npm install
```

### Run
```
npm run start
```

### Run tests
```
npm run test
```

## Endpoints

### City
```
GET /api/city?query=Vancouver
```
Returns info on cities

### User
```
PUT /api/user
```
Updates user info, including ip info. Requires JWT authentication.

Parameters:
- firstName, required
- lastName, required


```
POST /api/register
```

Parameters:

- email, required
- firstName, required
- lastName, required
- password, required


``` 
POST /api/login
```

Returns a JWT

Parameters:

- email, required
- password, required

```
GET /api/user/info
```

Returns last user info that has been saved in the database. Requires JWT authentication.