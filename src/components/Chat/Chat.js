import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import { InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import './Chat.css';
import db from './../../firebase';
import { useStateValue } from './../../hoc/StateProvider/StateProvider';
import firebase from 'firebase';

function Chat() {
  const { roomId } = useParams();
  const [{user}, dispatch] = useStateValue();

  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      const room = db.collection('rooms').doc(roomId);

      room.onSnapshot(snap => {
        setRoomName(snap.data().name);
      });

      room.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => (
        setMessages(snap.docs.map(doc => doc.data()))
      ));
    }
  }, [roomId]);
  
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('');
  }

  const isReceiver = (msg) => (
    msg.name === user.displayName && 'chat__receiver'
  )

  const lastMessage = () => (
    new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
  )

  return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>Last seen at {lastMessage()}</p>
				</div>

				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			<div className="chat__body">
				{messages.map(msg => (
					<p className={`chat__message ${isReceiver(msg)}`}>
						<span className="chat__name">{msg.name}</span>
						{msg.message}
						<span className="chat__timestamp">
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
					</p>
				))}
			</div>
			<div className="chat__footer">
				<InsertEmoticon />
				<form action="">
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button type="submit" onClick={sendMessage}>
						Send a message
					</button>
				</form>
				<Mic />
			</div>
		</div>
  );
}

export default Chat;
