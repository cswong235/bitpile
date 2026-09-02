import logo from './assets/BitPile.png';
import NoImage from './assets/NoImage.png';

function Game({image, title, platform, rating, description}){
  return(
    <>
      <div class="border border-success rounded-3 col-3">
        <div class="overflow-hidden rounded-3 mt-3">
          <img 
            src={image ?? NoImage} 
            alt="Game thumbnail"
            style={{ objectFit: 'cover' }}
            height='200px'
            width='450px'
          />
        </div>
        <div class="d-flex align-items-center justify-content-center mt-2">
          <h2>{title ?? 'TBA'}</h2>
        </div>
        <p>{platform ?? 'TBA'}</p>
        <p>{rating ?? 'TBA'}</p>
        <p>{description ?? 'TBA'}</p>
      </div>
    </>
  )
}
function App(){
  return(
    <>
      <header class="p-3 bg-success">
        <img src={logo} alt="BitPile logo" width="250px"/>
      </header>
      <h1 class="p-3">Game Collection</h1>
      <div class="container-fluid">
        <div class="row align-items-start justify-content-start gap-3">
          <Game title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4}/>
          <Game title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4}/>
          <Game title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4}/>
          <Game title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4}/>
          <Game title={'Destiny 2'} platform={'PS, Xbox, PC'} rating={4}/>
        </div>
      </div>
    </>
  )
}

export default App;