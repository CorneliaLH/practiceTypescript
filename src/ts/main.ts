import { MoreService } from "../models/moreService";
import { Service } from "../models/service";

window.onload = function () {
  //element inputfält, button

  let root = document.getElementById("root");
  let header1 = document.createElement("h1");
  header1.innerText = "Välkommen!";
  let header2 = document.createElement("h2");
  header2.className = "header2";
  header2.innerText = "Sök efter din favorit-film i fältet nedan:";
  let containerInput = document.createElement("div");
  root.append(header1, header2, containerInput);
  let inputField = document.createElement("input");
  inputField.placeholder = "Vilken film?";
  let button = document.createElement("button");
  button.innerText = "SÖK";
  let main = document.createElement("main");
  containerInput.append(inputField, button);
  root.append(main);

  //vid knapptryck tartar funktion
  button.addEventListener("click", searchMovie);
  function searchMovie() {
    //tömmer tidigare sökningar
    main.innerText = "";

    //input-value är värden som skickas till constructorn IService()

    let service = new Service(inputField.value);

    //respons från Service kommer som ett promise
    service.getData().then((response) => {
      console.log(response.Response);
      //for-loop för att skapa en lista över filmerna som matchar sökresultatet (de första 10)

      if (response.Response == "False") {
        let notFoundPicture = document.createElement("img");
        notFoundPicture.src = require("/src/img/movie3.jpg");
        notFoundPicture.className = "notFoundPicture";
        let notFoundMessage = document.createElement("h2");
        notFoundMessage.innerText =
          "Filmen hittades tyvärr inte, försök gärna igen!";
        main.append(notFoundMessage, notFoundPicture);
      } else {
        for (let i = 0; i < response.Search.length; i++) {
          let container = document.createElement("div");
          container.className = "container";
          main.append(container);
          let liMovie = document.createElement("p");
          let poster = document.createElement("img");
          if (response.Search[i].Poster != "N/A") {
            poster.src = response.Search[i].Poster;
          } else {
            poster.src = require("/src/img/movie2.jpg");
          }
          poster.className = "poster";
          container.innerText = response.Search[i].Title;
          liMovie.innerHTML = `${response.Search[i].Year}`;
          poster.addEventListener("click", moreInfo);
          container.append(liMovie, poster);
          function moreInfo() {
            main.innerHTML = "";
            let containerMovie = document.createElement("div");
            containerMovie.className = "containerMovie";
            console.log(response.Search[i].imdbID);
            let movieInfo = new MoreService(response.Search[i].imdbID);
            movieInfo.getData().then((response1) => {
              console.log(response1);
              let header = document.createElement("h2");
              let containerText = document.createElement("div");
              containerText.className = "containerText";
              let infoText2 = document.createElement("p");
              let infoText3 = document.createElement("p");
              let infoText4 = document.createElement("p");
              let infoText5 = document.createElement("p");
              let infoText6 = document.createElement("p");
              let infoText7 = document.createElement("p");
              let containerPoster = document.createElement("div");
              containerPoster.className = "containerPoster";
              let posterMovie = document.createElement("img");
              posterMovie.className = "posterMovie";
              let textMovie = document.createElement("p");
              textMovie.innerText = "No Poster";
              textMovie.className = "textMovie";

              header.innerText = response1.Title;
              if (response1.Poster != "N/A") {
                posterMovie.src = response1.Poster;
              } else {
                posterMovie.src = require("/src/img/movie2.jpg");
                containerPoster.append(textMovie);
              }
              // posterMovie.src = response1.Poster;
              infoText2.innerText = `Relesedatum: ${response1.Released}`;
              infoText3.innerText = `Längd: ${response1.Runtime}`;
              infoText4.innerText = `Genre: ${response1.Genre}`;
              infoText5.innerText = `Skådespelare: ${response1.Actors}`;
              infoText6.innerText = `Plot: ${response1.Plot}`;
              infoText7.innerText = `Priser: ${response1.Awards}`;
              main.append(containerMovie);
              containerMovie.append(
                header,

                containerText,
                containerPoster
              );
              containerPoster.append(posterMovie);
              containerText.append(
                infoText2,
                infoText3,
                infoText4,
                infoText5,
                infoText6,
                infoText7
              );
            });
          }
        }
      }
    });
  }
};
