import { IService } from "./IService";

export class MoreService implements IService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
  getData() {
    console.log(encodeURI(this.id));
    return fetch("https://www.omdbapi.com/?i=" + this.id + "&apikey=33da284b", {
      method: "GET",
    })
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
    throw new Error("Method not implemented.");
  }
}
