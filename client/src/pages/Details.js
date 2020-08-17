import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import { GET_ONE_MOVIE, GET_MOVIES, DELETE_MOVIE } from '../queries/moviesQueries'
import { GET_ONE_TVSERIES } from '../queries/tvSeriesQueries'
import { GET_FAVORITES } from '../queries/favoriteQueries'
import { client } from '../config/client'
import { GiSelfLove } from 'react-icons/gi'
import { FaRegSave, FaRegTrashAlt, FaTags } from 'react-icons/fa'
import { RiStarSmileLine } from 'react-icons/ri'


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

  const addToFav = () => {
    const { favorites: currentFav } = client.readQuery({
      query: GET_FAVORITES
    })

    console.log(data.movie)
    client.writeQuery({
      query: GET_FAVORITES,
      data: {
        favorites: currentFav.concat(data.movie)
      }
    })
  }

  if(loading){
    return <p> please wait ..</p>
  }

  if(pathname.includes('/movies')){
    return (
      <>
        <div className="row mt-5 ml-4" >
          <div className="col-4">
              <img src={data.movie.poster_path} className="card-img-top" style={{width:400, boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)'}} />
          </div>
          <div className="col-6" >
            <div className="card"  style={{backgroundColor: "transparent",borderRight: '12px #021e47 inset'}}>
              <div className="card-body text-white">
                <a href="">
                  <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.movie.title.toUpperCase()}</h5>
                </a>
                <p className="card-text">{data.movie.overview}</p>
                <div className="row mt-4 mb-2">
                  <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5'}}>
                    <p style={{backgroundColor:'#0f3f5f' ,borderTop: '2px solid white'}} className="card-text"><RiStarSmileLine style={{marginBottom: '5px', fontSize: '37px'}} />  {data.movie.popularity}</p>
                  </div>
                  <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5'}}>
                    <p style={{backgroundColor:'#0f3f5f' ,borderTop: '2px solid white'}} className="card-text"><FaTags  style={{fontSize: '37px'}}/> {data.movie.tags+" "}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <button className="btn btn-light mr-4 font-weight-bold" onClick={() => addToFav() } > <GiSelfLove style={{marginBottom:'2px'}}/> Fav this ! </button>
                    <Link className="btn btn-info mr-4 font-weight-bold" to={`/movies/update/${data.movie._id}`}> <FaRegSave style={{marginBottom:'3px'}}/> Update </Link>
                  </div>
                  <div className="col-4 text-right">
                    <button className="btn btn-danger mr-4 font-weight-bold" onClick={() => doDeleteMovie() }> <FaRegTrashAlt style={{marginBottom:'3px'}}/> Delete </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="row mt-5 ml-4" >
          <div className="col-4">
              <img src={data.tvSeries.poster_path} className="card-img-top" style={{width:400, boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)'}} />
          </div>
          <div className="col-6" >
            <div className="card"  style={{backgroundColor: "transparent",borderRight: '12px #021e47 inset'}}>
              <div className="card-body text-white">
                <a href="">
                  <h5 className="card-title text-white" style={{ fontSize: "30px" }}>{data.tvSeries.title.toUpperCase()}</h5>
                </a>
                <p className="card-text">{data.tvSeries.overview}</p>
                <div className="row mt-4">
                  <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5'}}>
                    <p style={{backgroundColor:'#0f3f5f' ,borderTop: '2px solid white'}} className="card-text"><RiStarSmileLine style={{marginBottom: '5px', fontSize: '37px'}} />  {data.tvSeries.popularity}</p>
                  </div>
                  <div className="col-4 text-center" style={{ height: '100px', lineHeight: '5'}}>
                    <p style={{backgroundColor:'#0f3f5f' ,borderTop: '2px solid white'}} className="card-text"><FaTags  style={{fontSize: '37px'}}/> {data.tvSeries.tags+" "}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
