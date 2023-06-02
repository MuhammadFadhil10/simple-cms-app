import { Api } from "./api";

export class Pages {
  static async getPages(webId: string) {
    const { data } = await Api.get(`/pages/${webId}`);

    return data.data;
  }
}
