const apiKey = "83f4072b1dc5426a92e38f3de273059f";
const pageSize = 26;
var games;
var creators;

loadGames();
loadCreators();

async function loadGames() {
  try {
    const result = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}`);
    const data = await result.json();
    games = data.results;

    games.sort((a, b) => b.rating - a.rating)

    setFirtsGames();
    setGames();
  } catch (error) {

    throw new Error("Não foi possível obter os dados")
  }
}

async function loadCreators() {
  try {
    const result = await fetch(`https://api.rawg.io/api/creators?key=${apiKey}`);
    const data = await result.json();
    creators = data.results;

    setCreatorsSection();
  } catch (error) {

    throw new Error("Não foi possível obter os dados")
  }
}

function setFirtsGames() {
  let slide = "";

  for (let i = 0; i < 5; i++) {
    slide += `
      <article class="card-video carousel-item ${i == 0 && "active"}">
        <div class="video">
          <img src="${games[i].background_image}" alt="${games[i].name}" />
        </div>

        <div class="video-info">
          <h2>${games[i].name}</h2>
          <p>
            <span class="bold">Lançamento:</span>
            <time pubdate="${games[i].released}">
              ${games[i].released}
            </time>
          </p>
          <p>
            <span class="bold">Plataformas:</span>
            ${games[i].platforms.map(platform => " " + (platform.platform.name))}
          </p>
          <p>
            <span class="bold">Avaliação:</span>
            ${games[i].rating}
          </p>
          <p>
            <a href="detalhes.html?id=${games[i].id}">Mais detalhes...</a>
          </p>
        </div>

      </article>
    `
  }

  document.getElementById('slide-games').innerHTML = slide;
}

function setGames() {
  let cards = "";

  for (let i = 5; i < 15; i++) {
    cards += `
      <div class="mini-card">
        <h3>${games[i].name}</h3>
        <img src="${games[i].background_image}" alt="${games[i].name}">
        <p><a href="detalhes.html?id=${games[i].id}">Mais detalhes...</a></p>
      </div>
    `
  }

  document.querySelector('.game-container').innerHTML = cards;
}

function loadMoreGames() {
  let cards = "";

  for (let i = 15; i <= 25; i++) {
    cards += `
      <div class="mini-card">
        <h3>${games[i].name}</h3>
        <img src="${games[i].background_image}" alt="${games[i].name}">
        <p><a href="detalhes.html?id=${games[i].id}">Mais detalhes...</a></p>
      </div>
    `
  }

  document.getElementById('loadMoreGamesButton').disabled = true;
  document.querySelector('.game-container').innerHTML += cards;
}

function loadSearchedGame(sGames) {
  let infoGame = `
  <section id="destaques">
    <button onclick="window.location.reload()" ><i class="bi bi-arrow-left"></i>Clique para voltar</button>
    <h1>Resultado da Pesquisa</h1>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div id="slide-games" class="carousel-inner"> 

  `;

  for (let i = 0; i < sGames.length; i++){
    infoGame += `
      <article class="card-video carousel-item ${i == 0 && "active"}">
          <div class="video">
            <img src="${sGames[i].background_image}" alt="${sGames[i].name}" />
          </div>

          <div class="video-info">
            <h2>${sGames[i].name}</h2>
            <p>
              <span class="bold">Lançamento:</span>
              <time pubdate="${sGames[i].released}">
                ${sGames[i].released}
              </time>
            </p>
            <p>
              <span class="bold">Plataformas:</span>
              ${sGames[i].platforms.map(platform => " " + (platform.platform.name))}
            </p>
            <p>
              <span class="bold">Avaliação:</span>
              ${sGames[i].rating}
            </p>
            <p>
              <a href="detalhes.html?id=${sGames[i].id}">Mais detalhes...</a>
            </p>
          </div>

      </article>
    `
  }
  sGames.forEach(sgame => {
    
  })

  infoGame += `
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  </section>
  `

  document.getElementById('main-home').innerHTML = infoGame;
}

async function search() {
  const name = document.getElementById("searchInput").value;
  let searchedGame = [];

  try {
    const result = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`);
    console.log("Result  " + result)
    const data = await result.json();
    console.log("Data  " + data)
    console.log("Data data  " + searchedGame)
    searchedGame = data.results

  } catch (error) {
    alert("Não encontramos resultados :(");
    throw new Error("Não foi possível obter os dados")
  }

  loadSearchedGame(searchedGame);
  document.getElementById("searchInput").value = ""
}

function setCreatorsSection() {
  let card = "";

  creators.forEach(creator => {
    card += `
      <article class="creators-card">
        <h3>${creator.name}</h3>
        <div class="image-container">
          <img src="${creator.image}" alt="${creator.name}">
        </div>
        <p>Numero de jogos: ${creator.games_count}</p>
      </article>
    `
  })

  document.querySelector('.creators-container').innerHTML = card;
}