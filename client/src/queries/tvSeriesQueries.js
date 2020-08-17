import { gql } from '@apollo/client';

export const GET_TVSERIES = gql`
  query {
    allTVSeries{
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`

export const GET_ONE_TVSERIES = gql`
  query ($selectedId: String) {
    tvSeries(_id: $selectedId) {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`


export const DELETE_TVSERIES = gql`
  mutation ($selectedId: String) {
    deleteSeries(_id: $selectedId){
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags,
    }
  }
`