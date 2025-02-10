import { Client, Account, Storage, Databases } from "appwrite";

export const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("6795283800384ec117ee");

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export { ID } from "appwrite";
