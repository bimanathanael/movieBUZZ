import '../Card.css';
import React from 'react'
import { useHistory, useLocation} from 'react-router-dom'
import { AiFillTags , AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const Card = ({data, path}) => {
  const history = useHistory()
  const {pathname} = useLocation()

  let stars = []
  let popularity = Math.ceil(data.popularity)
  
  while( popularity > 0 ){
    stars.push("full")
    popularity -= 2
  }
  let emtpyStars = new Array(5-stars.length).fill('empty')
  
  const styles = {
    card: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      marginBottom: 10,
      marginRight: '10%',
      fontFamiliy: 'Roboto Condensed',
    },
    img: {
      boxShadow: '1px 2px 30px 8px rgba(0,0,0,0.61)',
      height: '80%',
      width: '100%',
    },
    tagBox: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 4,
      width: "100%",
      fontSize: 12,
      marginRight: "2%",
    },
    popularity: {
      color: 'white',
      borderRadius: '32px',
      padding: '5px',
      paddingLeft: '7px',
      paddingRight: '7px',
      marginTop: '8px',
      width: '100%',
      marginBottom: '9px',
    },
    infoBtn: {
      width: '100%', 
      backgroundColor: '#d35400' , 
      borderColor: '#d35400', 
      color: "white",
    }
  }

  const toDetails = () => {
    history.push({
      pathname: `${path}/details/${data._id}`,
      fromFav: pathname === '/favorites' ? true : false
    })
  }

  return (
    <>
      <div className="card" style={styles.card} onClick={() => toDetails()}>
        <div style={{overflow: 'hidden', padding:'25px', paddingBottom: 0}}>
          <img src={data.poster_path} className="card-img-top" style={styles.img} alt={data.title}/>
          <p style={styles.popularity} className="text-center"> 
            {
              stars.map ( (star, idx) => {              
                return <AiFillStar key={idx} color="#f1c40f"/> 
              })
            }
            {
              emtpyStars.map ( (star, index) => {              
                return <AiOutlineStar key={index} color="#ecf0f1"/> 
              })
            }
          </p>
        </div>
        
        <div className="card-body" style={{paddingTop:  '3px'}}>
          <h4 style={{color: '#bdc3c7', fontSize:'20px'}}> {data.title} </h4>
          <p className="card-text">
            { data.tags.map ( (tag,idx) => {
              return (
                <>
                  <span style={styles.tagBox}><AiFillTags/> {`${tag}`} &nbsp;</span>
                  { (idx+1) % 3 === 0 ? <><br style={{lineHeight:'22px'}}/><br/></> : null }
                </>
              )
            })
          }
          </p>          
        </div>
      </div>
    </>
  )
}
