import config from "../config/config";
import { ID, Client, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, name, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      // throw error;
      console.log("Appwrite Service : auth : userAccount : error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      // throw error;
      console.log("Appwrite Service : auth : login : error", error);
    }
  }
  
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // throw error;
      console.log("Appwrite Service : auth : getCurrentUser : error", error);
    }
    return null;
  }
  
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      // throw error;
      console.log("Appwrite Service : auth : logout : error", error);
    }
  }
  
}

const authService = new AuthService();

export default authService;
