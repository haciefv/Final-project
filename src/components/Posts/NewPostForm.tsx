/* eslint-disable react/jsx-key */
import { Flex,Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { BsLink45Deg,BsMic } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoDocument, IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";

import { Icon } from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '../../atoms/postsAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useSelectFile from '../../hooks/useSelectFile';
// import Tab from './TabItems';

type NewPostFormProps = {
    user:User;
    communityImageURL?:string
    
};
const formTabs= [
    {
        title:"Post",
        icon:IoDocumentText
    },
    {
        title:"Images & Video",
        icon:IoImageOutline
    },

]
export type TabItems = {
    title:string;
    icon: typeof Icon.arguments
}
const NewPostForm:React.FC<NewPostFormProps> = ({user,communityImageURL}) => {
    const router = useRouter();
    
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [textInputs,setTextInputs]=useState({
        title:"",
        body:""
    })

    // const [selectedFile,setSelectedFile]=useState<string>();
    const {selectedFile,setSelectedFile,onSelectFile}=useSelectFile();
    const [loading,setLoading]=useState(false);
    const [error,setError] = useState(false)

    const handleCreatePost =async()=>{
        const {communityId}= router.query;
        // creeate new Post object => type post
        const newPost:Post={
            // id:,
            communityimageURL:communityImageURL||"",
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        
        };

        setLoading(true)
        try {
            const postDocRef = await addDoc(collection(firestore,"posts"),newPost)
            if (selectedFile){
                const imageRef = ref (storage,`posts/${postDocRef.id}/image`)
                await uploadString(imageRef, selectedFile,"data_url")
                const downloadURL = await getDownloadURL(imageRef)

                await updateDoc(postDocRef,{
                    imageURL:downloadURL,
                })

            }
            
        } catch (error:any) {
            console.log("hancleCreatePost error:",error.message)
            setError (true)
        }
        console.log("worked")
        setLoading(false)

        // store that in db
        router.back()
    }
    

    const onTextChange = (
        event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
    ) =>{
        const {target:{name,value}} = event
        setTextInputs(prev=>({
            ...prev,
            [name]:value,
        }))
    }
    
    return (
        <Flex
            direction="column" bg="white" borderRadius ={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item)=>(
               
               
               // <TabItems key={item.title} item={item} selected={item.title===selectedTab} setSelectedTab={setSelectedTab} />
               
               
               
               <Flex
               justify="center"
               align="center"
               flexGrow={1}
               p="14px 0px"
               cursor="pointer"
               fontWeight={700}
               color={ "gray.500"}
               borderWidth={  "0px 1px 1px 0px"}
               borderBottomColor={ "gray.200"}
               borderRightColor="gray.200"
               _hover={{ bg: "gray.50" }}
               onClick={() => setSelectedTab(item.title)}
             >
               <Flex align="center" height="20px" mr={2}>
                 <Icon height="100%" as={item.icon} fontSize={18} />
               </Flex>
               <Text fontSize="10pt">{item.title}</Text>
             </Flex>
               
               
               
               
               
               
               
               
               
               
               
               ))} 
            </Flex>
            <Flex p={4}>
              {selectedTab==="Post"&&<TextInputs textInputs={textInputs} 
                handleCreatePost={handleCreatePost} 
                onChange={onTextChange}
                loading={loading}
                />}
                {selectedTab==="Images & Video"&& 
                <ImageUpload 
                selectedFile={selectedFile}
                onSelectImage={onSelectFile}
                setSelectedTab={setSelectedTab}
                setSelectedFile={setSelectedFile}
                
                />}
            </Flex>

        </Flex>
    )
}
export default NewPostForm;