import React, {useEffect, useState} from 'react';
import './App.css'
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import Message from "./components/Message";
import {db} from "./firebase";
import { collection, getDocs,serverTimestamp,query,orderBy,  doc, onSnapshot,addDoc  } from "firebase/firestore";
import FlipMove from "react-flip-move";
import logo from './images/logo-24@4x.png'
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
const App = () => {
    const [input,setInput]=useState('')
    const [messages,setMessages]=useState([])
    const [userName,setUserName]=useState(' ')
    useEffect(()=>{
        setUserName(prompt('Please Enter Your Name'))
    },[])
    useEffect(()=>{
        const q = query(collection(db, "messages"), orderBy('timeStamp','desc'));
        const unsub = onSnapshot(q ,(snapshot) => {
            let list=[];
            snapshot.docs.forEach(doc=>{
                list.push({id:doc.id,...doc.data()})
            })
            setMessages(list)
        },(err)=>{
            console.log(err);
        })
        return ()=>{
            unsub()
        }
    },[])

    const sendMessage =async (e) => {
        e.preventDefault()
       if(userName){
           try{
               await addDoc(collection(db, "messages"), {
                   message:input,
                   username:userName,
                   timeStamp:serverTimestamp()
               });

               setMessages([...messages,{username:userName,message:input,timeStamp:serverTimestamp()}])
               setInput('')
           }
           catch(err){
               alert(err);
           }
       }
       else{
           setUserName(prompt('Please Enter Your Name'))
       }

    }
    return (
        <div className={'App'}>
            <img src={logo}/>
          <h1>Hello Clever Programmers</h1>
            <h2>WellCome {userName}</h2>
         <form className={'app-form'} onSubmit={sendMessage}>
             <FormControl className={'app-formcontrol'}>
                 <InputLabel>Enter a Message ...</InputLabel>
                 <Input className={'app-input'} placeholder={'Enter Message :'} value={input} onChange={(e)=>
                     setInput(e.target.value)} />
                 <IconButton className={'app-iconbuttton'} disabled={!input} variant={'outlined'} color={'info'} type={'submit'}><SendIcon/></IconButton>
             </FormControl>
         </form>
           <FlipMove>
               {
                   messages.map((message,i )=>{
                       return <Message key={i} username={userName} message={message}/>
                   })
               }
           </FlipMove>
        </div>
    );
};

export default App;