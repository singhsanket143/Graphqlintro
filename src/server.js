import { ApolloServer, gql } from 'apollo-server';

const TODOS = [
    {
        id: "1",
        task: "Todo 1",
        completed: true
    },
    {
        id: "2",
        task: "Todo 2",
        completed: false
    },
    {
        id: "3",
        task: "Todo 3",
        completed: true
    }
]

const USERS = [
    {
        id: 1,
        email: "a@b.com",
        todos: [TODOS[1], TODOS[2]]
    },
    {
        id: 2,
        email: "c@b.com",
        todos: []
    }
]

const typeDefs = gql`
    type Todo {
        id: ID!,
        task: String!,
        completed: Boolean!
    }

    type User {
        id: ID!,
        email: String!,
        todos: [Todo]!
    }

    type Query {
        getAllTodos: [Todo],
        getTodo(id: ID!): Todo!,
        getAllUsers: [User]!
    }
`;

const resolvers = {
    Query: {
        getAllTodos: () => {
            //  How to client gets array of todos in this query is defined here
            return TODOS;
        },
        getTodo: (_, params) => {
            return TODOS.find(todo=> todo.id == params.id)
        },
        getAllUsers: () => {
            return USERS;
        }
    }
}


// Create a new apolloserver object using the constructor
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.listen().then(() => {
    console.log("Graphql server is up")
})