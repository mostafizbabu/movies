//a923892b3fb23ccb6c2d2ad2a9d8697b
//Data fetching from API
const url= 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a923892b3fb23ccb6c2d2ad2a9d8697b&page=1';

const searchUrl= 'https://api.themoviedb.org/3/search/movie?api_key=a923892b3fb23ccb6c2d2ad2a9d8697b&query="';

const imagePath = 'https://image.tmdb.org/t/p/w1280'

getMovies(url);
//API Request

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    renderMovies(data.results);
}

//Javascript Selectors

const main = document.querySelector('.main');
const form = document.querySelector('form');
const input = document.querySelector('#search');

//Render Function

function renderMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie)=>{
        const movieTitle = movie.title;
        const movieRating = movie.vote_average;
        const moviePoster = movie.poster_path;
        const movieOverview = movie.overview;

        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        movieDiv.innerHTML = ` <img src="${imagePath + moviePoster}"
         alt="${movieTitle}"/>
        <div class="movie-info">
            <h3>${movieTitle}</h3>
            <span class="${getScoreClass(movieRating)}">${movieRating}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${movieOverview}
        </div>`;

        main.appendChild(movieDiv)

    });
}

function getScoreClass(score){
    if(score>=8){
        return 'green';
    }
    else if(score >=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener ('submit',(event)=>{
    event.preventDefault();
    const searchValue = input.value.trim();
    if(searchValue && searchValue !==''){
        getMovies(searchUrl + searchValue);
        searchValue = '';
    }
    else{
        window.location.reload();
    }
})