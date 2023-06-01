import { Api } from "./api";

export class Webs {
  static async getWebs() {
    const { data } = await Api.get("/webs");

    return data.data;
  }

  static async createWeb(body: unknown) {
    const { data } = await Api.post("/webs", body);

    return data.data;
  }
}
