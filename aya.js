console.log("JS WORKING");

const moviesContainer = document.getElementById("movies");
const background = document.getElementById("background");
const detailsContainer = document.getElementById("details");

const fetchMovies = async () => {
  try {
    const response = await fetch("https://api.imdbapi.dev/titles");
    const data = await response.json();

    const movies = data.titles || [];

    
    displayMovies(movies);

    
    const firstMovie = movies.find(m => m?.primaryImage?.url);
    if (firstMovie) {
     setBackground(firstMovie);
      showDetails(firstMovie);
   }


  } catch (error) {
    console.error("Error:", error);
  }
};



function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  const firstTen = movies.slice(0, 7);

  firstTen.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    const title =
      movie?.primaryTitle ||
      movie?.originalTitle ||
      "No Title";

    const img = movie?.primaryImage?.url;

    div.innerHTML = `
      <img src="${img || 'https://via.placeholder.com/100'}" width="100">
      <h3>${title}</h3>
    `;

    
    div.addEventListener("click", () => {
      showDetails(movie);
      setBackground(movie);
    });

    moviesContainer.appendChild(div);
  });
}



function showDetails(movie) {
  detailsContainer.innerHTML = `
    <h2>${movie?.primaryTitle || movie?.originalTitle}</h2>
    <p>${movie?.plot || "no description"}</p>
  
  `;
}



function setBackground(movies) {
  if (movies?.primaryImage?.url) {
      
    
    background.style.backgroundImage = `url(${movies.primaryImage.url})`;
     background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "top";
  
  }
}
fetchMovies();