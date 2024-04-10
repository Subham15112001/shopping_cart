import { Client,Account,ID } from "appwrite";
import { login,logout } from "../features/user/userSlice";
import conf from "../conf";
export class Apprwrite{
    client = new Client();
    account;

    constructor(){
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);     
    }
    
    async createAccount({email,password,name}){
        try {
            let user =  await this.account.create(ID.unique(),email,password,name);
            //if user is not null login the account
            if(user){
                this.login({email,password})
                console.log(user)
            }else{
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async logoutCurrentUser(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new Apprwrite();

export default authService