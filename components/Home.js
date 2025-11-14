import { useEffect, useState } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import "antd/dist/antd.css";
import styles from "../styles/Home2.module.css";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    // OLD:"http://localhost:3000/movies"

    fetch("https://my-moviz-back-sigma.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setMoviesData(data.movies));
  }, []);

  console.log(moviesData);

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(data)}
          className={styles.crossIcon}
        />
      </div>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>{likedMoviesPopover}</div>
  );

  //Fonction de tri
  function sortMovies(movies) {
    if (sortType === "rating-desc") {
      return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    }
    if (sortType === "rating-asc") {
      return [...movies].sort((a, b) => a.vote_average - b.vote_average);
    }
    if (sortType === "title-asc") {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    }
    return movies;
  }

  // Filtre
  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // tri+filtre
  const sortedMovies = sortMovies(filteredMovies);

  // cartes
  const movies = sortedMovies.map((data, i) => {
    const isLiked = likedMovies.some((movie) => movie === data.title);
    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={data.title}
        overview={data.overview}
        poster={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        voteAverage={data.vote_average}
        voteCount={data.vote_count}
      />
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
       
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.triBarre}>
        <SearchBar search={search} setSearch={setSearch} />
        <SortSelect onChange={setSortType} />
      </div>
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Home;
