import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/appwriteconfig"
import {Container, PostCard} from "../components/Index"

function AllPostsPage() {
    const [posts, setPosts] = useState([]);
    useEffect (()=> {
      const fetchData = async () => {
        try {
            const response = await appwriteService.getAllPosts([]);
            if (response && response.documents) {
                setPosts(response.documents);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    fetchData();
    }, [])
    // appwriteService.getAllPosts([]).then((posts) => {
    //   if(posts){
    //     setPosts(posts.documents)
    //   }
    // })
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key = {post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
              {/* <PostCard key = {post.$id} post = {post}/> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPostsPage