import React, { useState } from 'react'
import { GET_MOVIES } from '../queries/moviesQueries'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation,Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';


export const Movies = () => {
  const {pathname} = useLocation()
  
  const { loading, error, data } =  useQuery(GET_MOVIES)

  if(loading){
    return <p> loading ..</p>
  }

  if(error){
    return <p> {JSON.stringify(error)} </p>
  }

  return (
    <>
      <div className="row mb-5">
      <div className="col-10">
        <h1 className="text-white" style={{fontSize:23}}> Trending Movies</h1>
      </div>
      <div className="col-2" style={{paddingLeft: '7%'}}>
        <Link className="btn" style={{backgroundColor: '#c0392b', borderColor:'#c0392b', color: "white"}} to={'/addMovie'}> <b>+</b> Movie <b>+</b> </Link>
      </div>
    </div>
      <div className="row">
      {
        data.movies.map( movie => {
          return (
            <div className="col-3" key={movie._id}> 
              <Card data={movie} path={pathname}/>
            </div>
            )
          })
      }
      </div>
    </>
  )
}