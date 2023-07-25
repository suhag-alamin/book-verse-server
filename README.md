# BookVerse

BookVerse is a web application that allows users to search for books, save them to a list, and leave comments on them.

## Live API Link

[BookVerse API](https://book-verse-api.vercel.app/api/v1)

### Client Repo Link

[BookVerse Client](https://github.com/suhag-alamin/book-verse-client)

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- JWT
- Bcrypt

### Author

[Suhag Al Amin](https://suhag.me)

## Application Routes:

### Auth

- /auth/signup (POST)

```
{
    "name": {
        "firstName": "Suhag",
        "lastName": "Al Amin"
    },
    "email": "suhag2@gmail.com",
    "password": "123456"
}
```

- /auth/login (POST)

```
{
    "email": "suhag@gmail.com",
    "password": "123456"
}
```

- /auth/refresh-token (GET)
  -- Header: Authorization: token

### Book

- /book (POST)

```
{
    "title": "Title",
    "description": "description",
    "author": "64b7bea062d204a1ee7afc7d",
    "genre": "Action",
    "publicationYear": "2022"
}
```

- /book (GET)
- /book?searchTerm=text (GET)
- /book?publicationYear=2023&genre=Action&sortBy=createdAt&sortOrder=desc (GET)
- /book/:id (GET)
- /book (PATCH)

```
{
    "title": "Title",
    "description": "description",
    "author": "64b7bea062d204a1ee7afc7d",
    "genre": "Action",
    "publicationYear": "2022"
}
```

- /book/:id (DELETE)

### Wishlist

- /wishlist (POST)

```
{
    "book": "64b7bea062d204a1ee7afc7d"
}
```

- /wishlist (GET)

### Reading List

- /reading-list (POST)

```
{
    "book": "64b7bea062d204a1ee7afc7d"
}
```

- /reading-list (GET)

### Review

- /review (POST)

```
{
    "book": "64b7bea062d204a1ee7afc7d",
    "review": "This is a review"
}
```

- /review (GET)
