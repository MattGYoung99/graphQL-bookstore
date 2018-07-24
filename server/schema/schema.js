const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;
const _ = require('lodash');

//dummy data
var books = [
    { name: 'Name of the wind', genre: 'Fantasy', id: '1'},
    { name: 'The Final Empire', genre: 'Fantasy', id: '2'},
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3'},
]
var authors = [
    { name: 'Patrick Hendry', age: '63', id: '1'},
    { name: 'Brandon Sanderson', age: '34', id: '2'},
    { name: 'Jimmy Neutron', age: '44', id: '3'},
]

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }    
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }    
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from db / other source
               return _.find(books, { id: args.id});   
            }
        },
        author : {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        }
    } 
})

module.exports = new GraphQLSchema({
    query: RootQuery
})