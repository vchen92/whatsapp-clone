import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
import db from './../../../firebase';

function SidebarChat({ addNewChat, name, id }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db
      .collection('rooms').doc(id)
      .collection('messages').orderBy('timestamp', 'desc')
      .onSnapshot(snap => (
        setMessages(snap.docs.map(doc => 
          doc.data())))
      );
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  const lastMessage = () => (
    messages[0]?.message
  )

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{lastMessage()}</p>
        </div>
      </div>
    </Link>
    
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
