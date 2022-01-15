import { buildSchema } from "graphql";

export default buildSchema(`
    type Company {
        _id: ID!
        name: String!
    }

    input CompanyInput {
        name: String!
    }

    type RootQuery {
        company(id: ID!): Company!
    }

    type RootMutation {
        createCompany(companyInput: CompanyInput): Company!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
