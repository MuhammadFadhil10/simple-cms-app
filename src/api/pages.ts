import { Api } from "./api";

export class Pages {
  static async getPages(webId: string) {
    const { data } = await Api.get(`/pages/${webId}`);

    return data.data;
  }

  static async createPages(body: unknown) {
    return await Api.post("/pages", body);
  }

  static async deletePage(pageId: string) {
    return await Api.delete(`/pages/${pageId}`);
  }
}
