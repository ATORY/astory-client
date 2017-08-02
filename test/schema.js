export const typeDefs = `

type Article {
  id: ID!
  title: String
}

type Query {
  articles: [Article]
}

`;