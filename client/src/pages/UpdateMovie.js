import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { GET_MOVIES, UPDATE_MOVIE, GET_ONE_MOVIE} from '../queries/moviesQueries'


export const UpdateMovie = () => {
  
  const {id} = useParams()
  const history = useHistory()
  const [getUpdateMovie, setUpdateMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 9.9,
    tags: [],
  })

  const { loading, data } =  useQuery(GET_ONE_MOVIE, { variables: { selectedId: id }})
  const [updateMovie, {error}] = useMutation(UPDATE_MOVIE, 
    {
      refetchQueries: [{
        query: GET_MOVIES
      }]
    })

  useEffect( () => {
    if(data){
      setUpdateMovie({
        title: data.movie.title,
        overview: data.movie.overview,
        poster_path: data.movie.poster_path,
        popularity: data.movie.popularity,
        tags: data.movie.tags,
      })
    }
  },[data])
  
  if(loading){
    return <p> please wait ..</p>
  } 

  if(error){
    console.log(error, "errorerrorerrorerror")
  }

  const doUpdate = (e) => {
    e.preventDefault()
  
    updateMovie({
      variables: { id : data.movie._id , MovieInput : getUpdateMovie }
    })

    history.push('/movies')
  }

  const onHandleChange = (e) => {
    const { name, value} = e.target
    if(name === "tags"){
      if(!getUpdateMovie.tags.includes(value)){
        const newTags = getUpdateMovie.tags.concat(value)
        setUpdateMovie({
          ...getUpdateMovie,
          tags: newTags
        })
      } else {
        const newTags = getUpdateMovie.tags.filter(tag => tag !== value)
        setUpdateMovie({
          ...getUpdateMovie,
          tags: newTags
        })
      }
    } else {
      if(name === "popularity"){
        setUpdateMovie({
          ...getUpdateMovie,
          [name]: +value
        })
      } else {
        setUpdateMovie({
          ...getUpdateMovie,
          [name]: value
        })
      }
    }
  }

  return (
    <div className="container">
      <h3 className="display-1 text-info text-center"> Update Movie </h3>
      <br/>
      <form onSubmit={ (e) => doUpdate(e)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Title</label>
          <div className="col-sm-10">
            <input type="text" name="title" className="form-control" id="inputTitle" placeholder="enter title.." required="required"
            onChange={ (e) => onHandleChange(e) }
            value={getUpdateMovie.title}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Overview</label>
          <div className="col-sm-10">
            <input type="text"  name="overview" className="form-control" id="inputOverview" placeholder="enter overview.." required="required"
            onChange={ (e) => onHandleChange(e) }
            value={getUpdateMovie.overview}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Poster Path</label>
          <div className="col-sm-10">
            <input type="text"  name="poster_path" className="form-control" id="inputPoster" placeholder="enter poster link.." required="required"
            onChange={ (e) => onHandleChange(e) }
            value={getUpdateMovie.poster_path}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Popularity</label>
          <div className="col-sm-10">
            <input type="text"  name="popularity" className="form-control" id="inputPopularity" placeholder="enter popularity.." required="required"
            onChange={ (e) => onHandleChange(e) }
            value={getUpdateMovie.popularity}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label text-white">Tags</label>
          <div className="col-sm-3">
            <div className="form-check">
              {getUpdateMovie.tags.includes("thriller") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="thriller" id="thriller" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="thriller" id="thriller" />
              }
              <label htmlFor="thriller" className="form-check-label text-white">
                Thriller
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("horror") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="horror" id="horror" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="horror" id="horror" />
              }
              <label htmlFor="horror" className="form-check-label text-white">
                Horror
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("animation") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="animation" id="animation" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="animation" id="animation" />
              }
              <label htmlFor="animation" className="form-check-label text-white">
                Animation
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-check">
              {getUpdateMovie.tags.includes("action") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="action" id="action" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="action" id="action" />
              }
              <label htmlFor="action" className="form-check-label text-white">
                Action
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("scify") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="scify" id="scify" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="scify" id="scify" />
              }
              <label htmlFor="scify" className="form-check-label text-white">
                SciFY
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("others") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="others" id="others" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="others" id="others" />
              }
              <label htmlFor="others" className="form-check-label text-white">
                Others
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-check">
              {getUpdateMovie.tags.includes("drama") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="drama" id="drama" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="drama" id="drama" />
              }
              <label htmlFor="drama" className="form-check-label text-white">
                Drama
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("romance") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="romance" id="romance" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="romance" id="romance" />
              }
              <label htmlFor="romance" className="form-check-label text-white">
                Romance
              </label>
            </div>
            <div className="form-check">
              {getUpdateMovie.tags.includes("comedy") ? 
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="comedy" id="comedy" checked/>
                :
                <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="comedy" id="comedy" />
              }
              <label htmlFor="comedy" className="form-check-label text-white">
                Comedy
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn-primary"> Update Movie </button>
      </form>
    </div>
  )
}
