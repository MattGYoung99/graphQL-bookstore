const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const _ = require('lodash');
const Book = require('./models/book');
const Author = require('./models/author');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorid: parent.id})
                return Book.find({authorid: parent.id});
            }
        }    
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return _.find(authors, {id: parent.authorid })
                return Author.findById(parent.authorid);
            }
        }    
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
               return Book.findById(args.id);
            }
        },
        author : {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args) {
                return Author.find({});
            }
        }
    } 
})


const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parents, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorid: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                });
            return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});