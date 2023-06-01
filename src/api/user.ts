import { Api } from "./api";

export class User {
  private static setUser(body: unknown) {
    localStorage.setItem("authUser", JSON.stringify(body));
  }

  static async signin(body: unknown) {
    const response = await Api.post("/user/signin", body);

    this.setUser(response.data.data);

    return response;
  }

  static async signup(body: unknown) {
    const response = await Api.post("/user/signup", body);

    this.setUser(response.data.data);

    return response;
  }

  static async refreshtoken(token: string) {
    const response = await Api.get(`/user/refresh-token/${token}`);
    return response;
  }
}
