# NestJS & GraphQL example
## Run this one 

`docker-compose up -d && yarn start`

--- 



Types are decorated with `ObjectType` and each fields are decoreated with `Field`.

Next, you need to create the resolver for your type.

The resolver is the equivalent of the controller.

There, you can decorate your methods with the graphQL keywords/actions (query, mutation, subscription).


On `http://localhost:3000/graphql` you can access a graphQL query builder.

## GraphQL


### Query

```GRAPHQL
query{
  lesson{
    name
    startDate
  }
}
``` 

*Retrieves name and startDate of a lesson.*
`lesson` => is actually a method in the resolver, decorated with `Query`.


```graphql
query {
  lesson(id: "49fc7108-5f16-4a3e-8106-95d3473db007") {
    name
  }
}
```

**Response:**

```graphql
{
  "data": {
    "lesson": {
      "name": "Name boi"
    }
  }
}
```

### Mutation

```graphql
mutation{
  createLesson(
    name:"Name boi"
    startDate:"now"
    endDate:"later"
  ){
    id
    name
  }
}
```


```GRAPHQL
mutation{
  createLesson(
    createLessonInput: {
       name:"Name boi"
      startDate:"2020-10-06T19:42:33.851Z"
      endDate:"2020-10-06T19:42:33.851Z"
    }
  ) {
    id
    name
  }
}
```

*You've got to tell graphQL what data you want back. Even if it's a mutation.*
*It can be just `{}`, here it's `id` and `name`.*


**Response:**

```graphql
{
  "data": {
    "createLesson": {
      "id": "49fc7108-5f16-4a3e-8106-95d3473db007",
      "name": "Name boi"
    }
  }
}
```

```graphql
mutation{
  assignStudentsToLesson(
    assignStudentsToLessonInput:{
      studentIds: ["c4b10e88-1a95-4fc9-bc22-6778b75ee7ad"]
      lessonId:"810db91b-65da-4de4-809d-43881c2c3d4b"
    }
  ) {name id students{firstName}}
}
```
**Response:**


```graphql
{
  "data": {
    "assignStudentsToLesson": {
      "name": "BOI",
      "id": "810db91b-65da-4de4-809d-43881c2c3d4b",
      "students": [
        {
          "firstName": "Thomas"
        }
      ]
    }
  }
}
```