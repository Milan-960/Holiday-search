import { GraphQLClient, gql } from "graphql-request";

// Define the API URL and create a GraphQL client instance
const API_URL = "https://staging.sparrow.escapes.tech/graphql/";
const client = new GraphQLClient(API_URL);

// Define a function to fetch search results based on the input query
export const fetchSearchResults = async (query) => {
  // Define the GraphQL query for fetching search results
  const queryStr = gql`
    query ($query: String!) {
      saleSearch(query: $query, travelTypes: "HOTEL_ONLY") {
        resultCount
        sales(limit: 10, offset: 0) {
          id
          editorial {
            title
            destinationName
          }
          photos {
            url
          }
        }
      }
    }
  `;

  // Define the variables for the query
  const variables = { query };
  // Make the API request with the query and variables
  const response = await client.request(queryStr, variables);

  console.log("Search Results:", response.saleSearch);

  // Return the search results
  return response.saleSearch;
};
