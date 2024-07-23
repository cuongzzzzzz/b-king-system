// @ts-nocheck

import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: any) => state.auth.login.currentUser);
  console.log(userInfo)
  const [socket,setSocket] =useState<any>(null)

  useEffect(() => {
    if (userInfo) {
      const socketIo = io("http://localhost:8000", {
        auth: {
          id: userInfo._id,
          token: userInfo.accessToken,
        },
      });

     setSocket(socketIo)
      

      return () => {
        if (socketIo) socketIo.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
