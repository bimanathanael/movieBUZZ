import React, { useState } from 'react'
import { ADD_MOVIE, GET_MOVIES } from '../queries/moviesQueries'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
 
export const AddMovie = () => {
  
  const history = useHistory()
  const [newMovie, setNewMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 9.9,
    tags: [],
  })

  const [addMovie] = useMutation(ADD_MOVIE, 
  {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  })

  const onHandleChange = (e) => {
    const { name, value  } = e.target
    if(name === "tags"){
      if(!newMovie.tags.includes(value)){
        const newTags = newMovie.tags.concat(value)
        setNewMovie({
          ...newMovie,
          tags: newTags
        })
      } else {
        const newTags = newMovie.tags.filter(tag => tag !== value)
        setNewMovie({
          ...newMovie,
          tags: newTags
        })
      }
    } else {
      if(name === "popularity"){
        setNewMovie({
          ...newMovie,
          [name]: +value
        })
      } else {
        setNewMovie({
          ...newMovie,
          [name]: value
        })
      }
    }
  }
  
  const doAddMovie = (e) => {
    e.preventDefault()
    console.log("masuk")
    addMovie({
      variables: { newOne : newMovie }
    })
    history.push('/movies')
  }

  console.log(newMovie,'newMovie')

  return (
    <div className="container">
      <h3 className="display-1 text-info text-center"> Add Movie </h3>
      <br/>
      <form onSubmit={ (e) => doAddMovie(e)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" name="title" className="form-control" id="inputTitle" placeholder="enter title.." 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.title}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Overview</label>
          <div className="col-sm-10">
            <input type="text"  name="overview" className="form-control" id="inputOverview" placeholder="enter overview.." 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.overview}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Poster Path</label>
          <div className="col-sm-10">
            <input type="text"  name="poster_path" className="form-control" id="inputPoster" placeholder="enter poster link.." 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.poster_path}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Popularity</label>
          <div className="col-sm-10">
            <input type="number"  name="popularity" className="form-control" id="inputPopularity" placeholder="enter popularity.." 
            onChange={ (e) => onHandleChange(e) }
            value={newMovie.titlpopularitye}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Tags</label>
          <div className="col-sm-3">
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="thriller" id="thriller"/>
              <label htmlFor="thriller" className="form-check-label">
                Thriller
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="horror" id="horror"/>
              <label htmlFor="horror" className="form-check-label">
                Horror
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="animation" id="animation"/>
              <label htmlFor="animation" className="form-check-label">
                Animation
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="comedy" id="comedy"/>
              <label htmlFor="comedy" className="form-check-label">
                Comedy
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="drama" id="drama"/>
              <label htmlFor="drama" className="form-check-label">
                Drama
              </label>
            </div>
            <div className="form-check">
              <input onChange={ (e) => onHandleChange(e)} className="form-check-input" type="checkbox" name="tags" value="romance" id="romance"/>
              <label htmlFor="romance" className="form-check-label">
                Romance
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn-primary"> add Movie </button>
      </form>
    </div>
  )
}