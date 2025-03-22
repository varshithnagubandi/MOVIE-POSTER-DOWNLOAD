import React, { useRef, useEffect, useState } from "react";

const App = () => {
  const inputRef = useRef();
  const [details, setDetails] = useState([]);

  const search = async (moviename) => {
    if (moviename === "") {
      alert("Enter Movie Name");
      return;
    }
    try {
      console.log(moviename);
      const url = `https://www.omdbapi.com/?s=${moviename}&apikey=1ab50717`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "False") {
        alert(data.Error);
        console.log("hi");
        return;
      }
      console.log(data.Search);
      setDetails(data.Search || []);
    } catch (error) {
      console.log(error);
    }
  };

  // to download image fom api --> we have to convert to --> objecturl
  const download = (url) => {
    fetch(url)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    search("game of thrones");
  }, []);

  return (
    <div className="container mt-4">
      <center>
        <h1 className="mb-4">
          SEARCH YOUR FAVORITE <span className="badge bg-danger">MOVIE</span>
        </h1>

        <div className="mb-3">
          <input
            type="text"
            ref={inputRef}
            className="form-control w-50 mx-auto"
            placeholder="ENTER MOVIE NAME [BATMAN,MONEY HEIST,AVENGERS ...]"
          />
        </div>

        <button
          type="button"
          className="btn btn-outline-primary mb-4"
          onClick={() => search(inputRef.current.value)}
        >
          SEARCH
        </button>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {details.map((movie) => (
            <div key={movie.imdbID} className="col">
              <div className="card shadow-lg border-0 rounded">
                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt={movie.Title}
                  style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="text-muted">Year: {movie.Year}</p>

                  <a
                    
                    className="btn btn-primary"
                    onClick={() => download(movie.Poster)}
                  >
                    DOWNLOAD POSTER
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};

export default App;
