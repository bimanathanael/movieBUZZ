import React from 'react'
import { GET_ALL } from '../queries/generalQueries'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { Link } from 'react-router-dom'

export const Home = () => {
  const { loading, error, data } =  useQuery(GET_ALL)

  if(loading){
    return (
      <p> loading ..</p>
    )
  }

  setTimeout(() => {
    return <h1 className="text-white"> loading </h1>
  }, 10000);

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
        {data.movies.slice(0,4).map( movie => {
          return (
            <div className="col-3" key={movie._id}> 
              <Card data={movie} path={"movies"}/>
            </div>
            )
          })
        }
      </div>
      <hr style={{backgroundColor: 'red'}}/>
      
      <h1 className="text-white mb-3  mt-5" style={{fontSize:23}}> Trending TV Series</h1>
      <div className="row">
        {data.allTVSeries.slice(0,4).map( movie => {
          return (
            <div className="col-3" key={movie._id}> 
              <Card data={movie} path={"tvSeries"}/>
            </div>
            )
          })
        }
      </div>
    </>
  )
  
}