import logo from './assets/BitPile.png';
import platformIcon from './assets/controller-svgrepo-com.svg';
import NoImage from './assets/NoImage.png';
import Carousel from 'react-bootstrap/Carousel';
// import { useState } from 'react';

function Game({image, title, platform, rating, description}){
  let stars = [];
  // For each star in the rating, push it into the array
  for(let i = 0; i < rating; i++){
    stars.push('★');
  }

  // Starting from the last star in the array and within the bounds of 5 stars
  // Render the remaining empty stars
  for(let i = rating; i < 5; i++){
    stars.push('☆');
  }
  return(
    <>
      <div className="border bg-white align-items-center justify-content-center rounded-3 hover p-2 max-vh-100" style={{ width: '500px' }}>
        <img 
          src={image ?? NoImage} 
          alt="Game thumbnail"
          className="w-100 mt-3 border rounded-4"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <h2 className="mt-2">{title ?? 'TBA'}</h2>
        <span className='m-0'>
          <img src={platformIcon} alt='Platform icon' width='30px' className='mr-4'/>
          {platform ?? 'TBA'}
        </span>
        <p className="text-warning lead">{stars}  <span className="text-dark">{rating}/5</span></p>
        <p>{description ?? 'TBA'}</p>
      </div>
    </>
  )
}

function AddGame(){
  // const [games, setGames] = useState([]);

  return(
    <>
      <h1>Add Game</h1>
    </>
  )
}

function App(){
  // const [gameCount, setGameCount] = useState(0);

  return(
    <>
      <header className="p-3 shadow">
        <img src={logo} alt="BitPile logo" width="250px"/>
      </header>
      <div className="d-flex flex-row align-items-center">
        <h1 className="p-3">Game Collection</h1>
        <span className="border p-2 rounded-5"><img src={platformIcon} alt='Platform icon' width='30px'/><strong>2000</strong> games</span>
      </div>
      <div className="container" style={{ maxWidth: '2000px' }}>
        <Carousel className="bg-green p-5 rounded-5">
          <Carousel.Item>
            <div className="carousel-container">
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 3'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game title={`No Man's Sky`} platform={'PS, Xbox, PC'} rating={4}/>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 3'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game title={`No Man's Sky`} platform={'PS, Xbox, PC'} rating={4}/>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-container">
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game image={'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'} title={'Destiny 3'} platform={'PS, Xbox, PC'} rating={4} description={'A looter-shooter developed by Bungie'}/>
              <Game title={`No Man's Sky`} platform={'PS, Xbox, PC'} rating={4}/>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div id="slice-wrapper position-relative" style={{ position: 'relative', height: 'auto' }}>
        <div id="slice-background"></div>

        <div id="slice-design">
          <div id="slice-1"></div>
          <div id="slice-2"></div>
        </div>

        <div className="container shadow border rounded-3 p-5 mt-5 add-window bg-white">
          <AddGame />
        </div>

        <div id="slice-design">
          <div id="slice-3"></div>
          <div id="slice-4"></div>
        </div>
      </div>
    </>
  )
}

export default App;