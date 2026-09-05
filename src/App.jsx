import logo from './assets/BitPile.png';
import platformIcon from './assets/controller-svgrepo-com.svg';
import genreIcon from './assets/module-management-svgrepo-com.svg';
import NoImage from './assets/NoImage.png';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function Filters({updateFilters}){
  // Set useStates to hold inputs
  const [platform, setPlatform] = useState('Any');
  const [rating, setRating] = useState('Any');
  const [genre, setGenre] = useState('Any');

  // Platforms and genres for selection
  const platforms = ['Any', 'PS4', 'PS5', 'PC', 'Nintendo Switch', 'Xbox', 'Android', 'iOS'];
  const genres = ['Any', 'First-Person Shooter', 'Third-Person Shooter', 'RPG', 'Roguelike', 'Fighting', 'Horror', 'Exploration'];
  const ratings = ['Any', 1, 2, 3, 4, 5];

  function handleSubmit(event){
    event.preventDefault();
    console.log(`Selected filters: Platform: ${platform}, Genre: ${genre}, Rating: ${rating}`);
    const filters = {
      platform: platform,
      rating: rating,
      genre: genre,
    }
    updateFilters(filters);
  }

  return(
    <>
      <div className="container shadow rounded-3 mt-5 p-4 mb-5 bg-white">
        <h3 className="mb-4 font-game">Filters</h3>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label d-block">Platform
                <Dropdown>
                  <Dropdown.Toggle className="bg-white border text-muted form-select text-start">
                    {platform}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {platforms.map((p, index) => (
                      <Dropdown.Item key={index} active={platform === p} onClick={() => setPlatform(p)}>
                        {p}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label d-block">Genre
                <Dropdown>
                  <Dropdown.Toggle className="bg-white border text-muted form-select text-start">
                    {genre}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {genres.map((g, index) => (
                      <Dropdown.Item key={index} active={genre === g} onClick={() => setGenre(g)}>
                        {g}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label d-block">Rating
                <Dropdown>
                  <Dropdown.Toggle className="bg-white border text-muted form-select text-start">
                    {rating}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {ratings.map((r, index) => (
                      <Dropdown.Item key={index} active={rating === r} onClick={() => setRating(r)}>
                        {r}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </div>
          </div>
          <button className="border btn btn-green" onClick={() => {updateFilters}}>Update Filters</button>
        </form>
      </div>
    </>
  )
}

function GameList({games}){
  // Build the star string for a game's rating
  function getStars(rating){
    const stars = [];
    // Add a filled star with the same number of rating score
    for(let i = 0; i < rating; i++){
      stars.push('★');
    }
    // For the remaining unearned stars and before the maximum (5) is reached
    // Render the unfilled stars
    for(let i = rating; i < 5; i++){
      stars.push('☆');
    }
    return stars;
  }

  // Take in an array of games
  // With slice, accomodate three objects per array
  // For each Carousel.Item, render those three arrays with map
  function splitArray(gameArray) {
    const result = [];
    let subarray = [];

    // Loop through the array of games
    for (let i = 0; i < gameArray.length; i++) {
      // Push each entry into the subarray, up to 3
      subarray.push(gameArray[i]);
      // If the subarray has reached the max length, push it into the result array
      // And clear out the subarray for the next batch of 3 games
      if (subarray.length === 3) {
        result.push(subarray);
        subarray = [];
      }
    }

    // If there are any remaining games that didn't fill up a batch
    // Push the partially filled subarray into the result array
    if (subarray.length > 0) {
      result.push(subarray);
    }

    return result;
  }

  // Render the game's group of threes
  // If there are games to render, split them into threes, if not, show an empty array
  const gameGroups = games && games.length ? splitArray(games) : [];

  return(
    <>
      <Carousel className="bg-green p-5 rounded-5">
        {/* Check if the games array has at least one entry, if so, display cards, if not, display message */}
        {gameGroups.length ?
          gameGroups.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="carousel-container d-flex justify-content-center flex-wrap gap-3">
                {group.map((game, gameIndex) => (
                  <div key={gameIndex} className="border bg-white align-items-center justify-content-center rounded-3 hover p-2 max-vh-100" style={{ width: '500px' }}>
                    <img
                      src={game?.image !== '' ? game?.image : NoImage}
                      alt="Game thumbnail"
                      className="w-100 mt-3 border rounded-4"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="d-flex flex-row align-items-center gap-3 font-game pt-2 pb-2 ps-2">
                      <h3 className="mt-2 m-0">{game?.name ?? '-'}</h3>
                    </div>
                    <hr/>
                    <span className='d-flex m-0 gap-2 mb-1'>
                      <img src={genreIcon} alt='Genre icon' width='30px' className='mr-4'/>
                      {game?.genre?.length ? game.genre.join(', ') : '-'}
                    </span>
                    <span className='d-flex m-0 gap-2'>
                      <img src={platformIcon} alt='Platform icon' width='30px' className='mr-4'/>
                      {game?.platform?.length ? game.platform.join(', ') : '-'}
                    </span>
                    <p className="text-warning lead">{getStars(game?.rating)}  <span className="text-dark">{game?.rating}/5</span></p>
                    <p>{game?.description ?? '-'}</p>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))
        : <Carousel.Item>
            <div className="container text-center">
              <h1 className="font-game mb-4">No games yet!</h1>
              <h3>Add your favourite games here.</h3>
            </div>
          </Carousel.Item>
        }
      </Carousel>
    </>
  )
}

function AddGame({insertGame}){
  // Set useStates to hold inputs
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState([]);

  // Platforms and genres for selection
  const platforms = ['PS4', 'PS5', 'PC', 'Nintendo Switch', 'Xbox', 'Android', 'iOS'];
  const genres = ['First-Person Shooter', 'Third-Person Shooter', 'RPG', 'Roguelike', 'Fighting', 'Horror', 'Exploration'];

  // Toggles values in a multi-select array
  // Takes in a selection from the options, the array of selected options, and the setPlatform setter
  function toggleSelection(value, selected, setSelected){
    // If the array of selected options have the one you picked
    if(selected.includes(value)){
      // Create a new array where it'll have the remaining selection except for the one you picked
      // And render it on the webpage
      // Basically just toggling it off
      setSelected(selected.filter((item) => item !== value));
    } else {
      // If not, add the new selection to the array of existing selections
      setSelected([...selected, value]);
    }
  }

  // Submit game
  function handleSubmit(event){
    // Prevents the form from refreshing the page
    event.preventDefault();
    // Initialize object to hold all the input values
    if(rating <= 0 || rating >= 6){
      alert('Please enter a valid rating from 1 to 5.');
    }else if(!name){
      alert('Please enter a name.');
    }else if(genre.length <= 0 ){
      alert('Please select at least one genre.');
    }else if(platform.length <= 0){
      alert('Please select at least one platform.');
    }else{
      const gameObject = {
        name: name,
        platform: platform,
        genre: genre,
        rating: rating,
        description: description,
        image: image,
      }

      // Call insertGame from the App component
      // Because that the App calling the AddGame component via <AddGame insertGame={insertGame}/>
      // It passed the insertGame prop with the "insertGame" function
      // So that's why the AddGame component can reach the insertGame function from App
      insertGame(gameObject);
    }
  }

  return(
    <>
      <h1 className="mb-4 font-game">Add Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">Game Name<span className="text-danger"> *</span>
              <input type="text" className="form-control" placeholder="Name" value={name} onChange={(event) => (setName(event.target.value))}></input>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Platform<span className="text-danger"> *</span>
              <Dropdown>
                <Dropdown.Toggle className="bg-white border text-muted form-select text-start">
                  {platform.length ? platform.join(', ') : 'Select platforms'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {platforms.map((p, index) => (
                    <Dropdown.Item as="label" key={index} className="d-flex align-items-center gap-2 mb-0">
                      <input type="checkbox" checked={platform.includes(p)} onChange={() => toggleSelection(p, platform, setPlatform)}/>
                      {p}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Genre<span className="text-danger"> *</span>
              <Dropdown>
                <Dropdown.Toggle className="bg-white border text-muted form-select text-start">
                  {genre.length ? genre.join(', ') : 'Select genres'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {genres.map((g, index) => (
                    <Dropdown.Item as="label" key={index} className="d-flex align-items-center gap-2 mb-0">
                      <input type="checkbox" checked={genre.includes(g)} onChange={() => toggleSelection(g, genre, setGenre)}/>
                      {g}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </label>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label d-block">Rating (1 - 5)<span className="text-danger"> *</span>
              <input type="number" className="form-control" placeholder="Rating" value={rating} onChange={(event) => (setRating(event.target.value))}></input>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Description
              <input type="text" className="form-control" placeholder="Description" value={description} onChange={(event) => (setDescription(event.target.value))}></input>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Image
              <input type="text" className="form-control" placeholder="Image Link" value={image} onChange={(event) => (setImage(event.target.value))}></input>
            </label>
          </div>
        </div>
        <button className="btn btn-green" onClick={() => {insertGame}}>Add Game</button>
      </form>
    </>
  )
}

function App(){
  const [games, setGames] = useState([
    {name: 'Destiny 2', platform: ['PC', 'PS4', 'PS5', 'Xbox'], genre: ['First-Person Shooter', 'RPG'], rating: 5, description: 'Explore the mysteries of Sol and experience exhilirating first-person shooter combat in Destiny 2. Unlock powerful abilities and collect unique gear across story missions, co-op, and PvP modes.', image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'},
    {name: 'Warframe', platform: ['PC', 'PS4', 'PS5', 'iOS', 'Android', 'Xbox'], genre: ['Third-Person Shooter', 'RPG'], rating: 4, description: `Join the Tenno and defend an ever-expanding universe. Wield your Warframe's tactical abilities, craft a loadout of devastating weaponry and define your path.`, image: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Warframe_Cover_Art.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'},
    {name: 'Helldivers 2', platform: ['PC', 'Xbox', 'PS5'], genre: ['Third-Person Shooter'], rating: 4, description: `The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.`, image: 'https://helldivers.wiki.gg/images/thumb/Helldivers_2_Key_Art_2x3.png/800px-Helldivers_2_Key_Art_2x3.png?21106d'},
  ]);
  const [gameCount, setGameCount] = useState(games.length);
  // Holds the currently selected filter criteria
  const [filters, setFilters] = useState({ platform: 'Any', genre: 'Any', rating: 'Any' });

  // Increases game count
  function incrementGameCount(){
    setGameCount(gameCount + 1);
  }

  // Inserts a new game into the array of games and increments count
  function insertGame(gameObject){
    setGames([...games, gameObject]);
    incrementGameCount();
    alert('Added a game successfully!');
  }

  // Stores whatever criteria the Filters form last submitted as an object
  function updateFilters(newFilters){
    setFilters(newFilters);
  }

  // Render the filtered array of games
  // Reads from the current state of filters and check if each game from the "games" useState matches the filters
  function getFilteredGames(){
    return games.filter((game) => {
      // .filter method only keeps games with the same property value as the filters in the new array
      // Or the match just straight up returns true when 'Any' is active without additional conditions

      // Checks if each game in the "games" state has a platform value matching the filter, or skip if 'Any'
      const platformMatch = filters.platform === 'Any' || game.platform.includes(filters.platform);

      // Checks if each game in the "games" state has a genre value matching the filter, or skip if 'Any'
      const genreMatch = filters.genre === 'Any' || game.genre.includes(filters.genre);

      // Checks if each game in the "games" state has a rating value matching the filter, or skip if 'Any'
      const ratingMatch = filters.rating === 'Any' || game.rating == filters.rating;

      // Return each game that has passed all three checks as true or false
      return platformMatch && genreMatch && ratingMatch;
    });
    // After filtering, what remains is a new array with only the filtered games
    // This gets passed to GameList to be rendered out
  }

  return(
    <>
      <header className="p-3 shadow w-25 rounded-top rounded-end-5 bg-white">
        <img src={logo} alt="BitPile logo" width="250px"/>
      </header>
      <Filters updateFilters={updateFilters}/>
      <div className="d-flex flex-row align-items-center">
        <h1 className="p-3 font-game">Game Collection</h1>
        <span className="border p-2 rounded-5 bg-white"><img src={platformIcon} alt='Platform icon' width='30px' className="p-1"/><strong>{gameCount}</strong> games</span>
      </div>
      <div className="container" style={{ maxWidth: '2000px' }}>
        <GameList games={getFilteredGames()}/>
      </div>
      <div id="slice-wrapper position-relative" style={{ position: 'relative', height: 'auto' }}>
        <div id="slice-background"></div>

        <div id="slice-design">
          <div id="slice-1"></div>
          <div id="slice-2"></div>
        </div>

        <div className="container shadow border rounded-3 p-5 add-window bg-white">
          <AddGame insertGame={insertGame}/>
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