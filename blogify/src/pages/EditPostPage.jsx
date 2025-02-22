import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components/Index'
import appwriteService from "../appwrite/appwriteconfig"
import {useNavigate, useParams} from "react-router-dom"

function EditPostPage() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPostPage