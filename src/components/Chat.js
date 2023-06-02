import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import notificationSound from "../suara/notifikasi.mp3";


export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [playNotification, setPlayNotification] = useState(false);
  const audioRef = useRef(null);
  const [users, setUsers] = useState([]);


  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };


  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const message = { ...change.doc.data(), id: change.doc.id };
          messages.push(message);
          if (message.user !== auth.currentUser.displayName) {
            setPlayNotification(true);
          }
        }
      });
      console.log(messages);
      const newUsers = snapshot.docs.map((doc) => doc.data().user);
      const uniqueUsers = Array.from(new Set(newUsers));
      setUsers(uniqueUsers);
      if (messages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...messages]);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  
  

  useEffect(() => {
  if (playNotification) {
    playNotificationSound();
    setPlayNotification(false);
  }
}, [playNotification]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
        {users.length > 0 && (
          <p>{users.join(", ")} joined the chat</p>
        )}
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <audio ref={audioRef} src={notificationSound} />
    </div>
  );
};