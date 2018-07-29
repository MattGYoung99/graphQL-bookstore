const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

//allows cross origin request
app.use(cors());
// connect to mlab database
// make sure to replace my db string & creds with you own

mongoose.connect('mongodb://matt:test123@ds153851.mlab.com:53851/boogiedb');
mongoose.connection.once('open', () => {
    console.log('connected to db')
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log(`It's working!`);
})