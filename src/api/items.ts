import { Item } from "@/features/web";
import { Api } from "./api";

export class Items {
  static async getItems(pageId: string) {
    const { data } = await Api.get(`/items?pageId=${pageId}`);

    return data.data;
  }

  static async createItems(body: Partial<Item>) {
    return await Api.post("/items", body);
  }

  static async updateItems(itemId: string, body: Partial<Item>) {
    delete body._id;

    return await Api.patch(`/items/${itemId}`, body);
  }
}
