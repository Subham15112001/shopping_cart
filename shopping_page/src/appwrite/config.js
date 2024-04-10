import conf from "../conf";
import { Client, ID ,Databases, Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);     
    }

    async createCart({user_id,item_id,quantity}){
        const itemId = `${user_id}${item_id}`;
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                itemId,
                {
                    item_id,
                    user_id,
                    quantity
                }
            )
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    
    async updateCart({user_id,item_id,quantity}){
        const itemId = `${user_id}${item_id}`;

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                itemId,
                {
                    quantity
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart({user_id,item_id}){
        const itemId = `${user_id}${item_id}`;

        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                itemId,
            )
        } catch (error) {
            console.log(error);
        }
    }

    async getCart(id){
      const queries = [Query.equal("user_id",[`${id}`])];

      try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
      } catch (error) {
        console.log(error)
      }
    }
}

const service = new Service();
export default service;
