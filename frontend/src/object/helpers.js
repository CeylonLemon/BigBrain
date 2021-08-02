import { ADDRESS } from '../helper/api';

export function debounce (fn, delay) {
  let timer = null
  return function () {
    const context = this
    const args = [...arguments];
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

export function uuid () {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuid = tempUrl.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(tempUrl);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
}

export const findGameById = (games, gid) => {
  console.log('fgbid', games.find(game => game.id === gid), typeof games[0].id)
  return games.find(game => game.id === gid)
}

export const connectToServer = (socketRef, body) => {
  const io = require('socket.io-client')
  socketRef.current = io(ADDRESS, body)
}
