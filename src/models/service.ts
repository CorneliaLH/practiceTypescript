import { IService } from "./IService";

/*class som tar emot titel på film och hämtar information från 
imdb baserat på titel*/

export class Service implements IService {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
  getData() {
    return fetch(
      "https://www.omdbapi.com/?i=tt3896198&apikey=33da284b&s=" +
        this.title +
        "&type=movie",
      { method: "GET" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (responseData) {
        console.log(responseData);
        return responseData;
      })
      .catch((err) => {
        console.log(err);
      });
    // throw new Error("Method not implemented.");
  }
}
