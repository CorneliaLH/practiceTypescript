import { IService } from "./IService";

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

// console.log(encodeURI(data.Search[0].Title));

// console.log(data.Search);
// for (let i = 0; i < data.Search.length; i++) {
//   console.log(data.Search[i].Title);
//   fetch(
//     "https://www.omdbapi.com/?i=tt3896198&apikey=33da284b&t=" +
//       data.Search[i].Title +
//       "&y=" +
//       data.Search[i].Year +
//       "&plot=full"
//   )
//     .then(function (response) {
//       response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       return data;
//     });
// }
