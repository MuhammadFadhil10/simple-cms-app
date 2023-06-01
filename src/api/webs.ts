import { Api } from "./api";

export class Webs {
  static async getWebs() {
    const { data } = await Api.get("/webs");

    return data.data;
    // try {
    //   console.log("asdasd: ", Api.defaults.headers.common.Authorization);
    //   const { data } = await Api.get("/webs");

    //   return data;
    // } catch (error) {
    //   console.log("Error get webs: ", error);
    //   return null;
    // }
  }
}
