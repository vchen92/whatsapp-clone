import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import { InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import './Chat.css';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();

  useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
  }, []);
  
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed >>> ', input);

    setInput('');
  }

  return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className="chat__headerInfo">
					<h3>Room Name</h3>
					<p>Last seen at...</p>
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
				<p className="chat__message">
          <span className="chat__name">Vincent Chen</span>
          Hey Guys
          <span className="chat__timestamp">3:52pm</span>
        </p>
				<p className={`chat__message ${true && 'chat__receiver'}`}>Hey Guys</p>
      </div>
			<div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"/>
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <Mic />
      </div>
		</div>
  );
}

export default Chat;
