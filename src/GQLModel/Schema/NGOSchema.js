const {gql}=require('apollo-server-express');

module.exports=gql`
    type Query {
        getNGO(Name:String!):NGO
        getNGOs:[NGO]
    }
    type Mutation{
        registerNGO(Ngo:inputNGO):NGO
        updateNGO(
            Name:String
            Ngo:inputNGO
        ):NGO
    }
    type NGO{
        name:String!
        ID:String!
        city:String
        email:String!
        mobile:Int
        about:String!
        description:String
        head:String
        team:[String]
    }
    input inputNGO{
        name:String!
        ID:String!
        city:String
        email:String!
        mobile:Int
        about:String!
        description:String
        head:String
        team:[String]
    }
`;
