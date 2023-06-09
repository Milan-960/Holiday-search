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

  // error
  if (response.saleSearch.resultCount === 0) {
    return { notFound: true };
  }

  // Return the search results
  return response.saleSearch;
};

// Define a function to fetch sale details based on the saleId
export const fetchSaleDetails = async (saleId) => {
  // Define the GraphQL query for fetching sale details
  const SALE_DETAILS_QUERY = gql`
    query ($saleId: String!) {
      sale(saleId: $saleId) {
        editorial {
          title
          destinationName
          hotelDetails
        }
        prices {
          leadRate {
            forDisplay
          }
        }
        photos {
          url
        }
      }
    }
  `;

  const variables = { saleId };

  const data = await client.request(SALE_DETAILS_QUERY, variables);

  // Check if the sale property exists in the returned data object
  if (!data.sale) {
    return { notFound: true };
  }
  // Return the sale details
  return data.sale;
};
