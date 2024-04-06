import config from "../config/config";
import {ID, Client, Databases, Storage, Query} from "appwrite";


export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    };

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status, 
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : createPost : error", error);
        }
    }
    
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status 
                }
            )
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : updatePost : error", error);
        }
    }
    
    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : deletePost : error", error);
            return false; 
        }
    }
    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : getPost : error", error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDbId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : getAllPosts : error", error);
            return false;
        }
    }
    
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : uploadFile : error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service : appwriteconfig : deleteFile : error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

    

}

const service = new Service();

export default service;