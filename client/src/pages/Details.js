import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { GET_ONE_MOVIE, GET_MOVIES, DELETE_MOVIE } from '../queries/moviesQueries'
import { GET_ONE_TVSERIES } from '../queries/tvSeriesQueries'

export const Details = () => {
  
  const {id} = useParams()
  const {pathname} = useLocation()
  
  const { loading, data } =  useQuery(
    pathname.includes('/movies') ? GET_ONE_MOVIE : GET_ONE_TVSERIES
  , { variables: { selectedId: id }})


  const [deleteMovie] = useMutation(DELETE_MOVIE, 
    {
      refetchQueries: [{
        query: GET_MOVIES
      }]
    }
  );
  
    const history = useHistory()

  const doDeleteMovie = () => {
    deleteMovie({ variables: { selectedId: data.movie._id} })
    history.push('/movies')
  }

  if(loading){
    return <p> please wait ..</p>
  }

  if(pathname.includes('/movies')){
    return (
      <>
      <div className="container">
        <div className="card">
          <img src={data.movie.poster_path} className="card-img-top" style={{width:400}} />
          <div className="card-body">
            <a href="">
              <h5 className="card-title">{data.movie.title}</h5>
            </a>
            <p className="card-text">{data.movie.overview}</p>
            <p className="card-text">{data.movie.popularity}</p>
            <p className="card-text">{data.movie.tags}</p>
            <Link className="btn btn-info" to={`/movies/update/${data.movie._id}`}> Update </Link>
            <button className="btn btn-danger" onClick={() => doDeleteMovie() }> Delete </button>
          </div>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <>
      <div className="container">
        <div className="card">
          <img src={data.tvSeries.poster_path} className="card-img-top" style={{width:400}} />
          <div className="card-body">
            <a href="">
              <h5 className="card-title">{data.tvSeries.title}</h5>
            </a>
            <p className="card-text">{data.tvSeries.overview}</p>
          </div>
        </div>
      </div>
      </>
    )
  }
}
