import {gql} from 'apollo-server-express';

export default gql`
extend type Query{
    eqAll:[eq!]
    eqByPK(eq_no:Int):eq
}

type eq{
    eq_no:Int
    eq_code:String
    eq_name:String
    createdAt:Date
    updatedAt:Date
}
`;