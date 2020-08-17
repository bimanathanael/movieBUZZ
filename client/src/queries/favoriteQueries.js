import { gql } from '@apollo/client';
import { client } from '../config/client'

export const GET_FAVORITES = gql`
  query {
    favorites{
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: [{
      _id: "5f3a90fa1fb14f567b2b55c5",
      title: "Aquaman",
      overview: "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.",
      poster_path: "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
      popularity: 7.0,
      tags: ["Action","Adventure"],
    }]
  }
})