import React, { useState } from 'react'
import { GET_TVSERIES } from '../queries/tvSeriesQueries'
import { useQuery } from '@apollo/client'
import { Card } from '../components/Card'
import { useLocation, Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';


export const TVSeries = () => {
  const {pathname} = useLocation()
  const [toggle, setToggle] = useState(false)
  
  const { loading, error, data } =  useQuery(GET_TVSERIES)

  if(loading){
    return <p> loading ..</p>
  }

  if(error){
    return <p> {JSON.stringify(error)} </p>
  }

  return (
    <>
      <h1 className="text-white mb-5" style={{fontSize:23}}> Trending Movies</h1>
      <div className="row">
      {
        data.allTVSeries.map( series => {
          return (
            <div className="col-3" key={series._id}> 
              <Card data={series} path={pathname}/>
            </div>
            )
        })
      }
      </div>
    </>
  )
}