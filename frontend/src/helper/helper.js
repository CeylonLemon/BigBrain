import { PRODUCTION_ADDRESS } from './api';

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const BlankPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAP1BMVEWpqan///+mpqaqqqqysrLIyMi2trbExMStra2/v7+jo6P6+vrr6+vb29vy8vL4+PjPz8/k5OTV1dXd3d3o6OgbQExvAAAFDklEQVR4nO2b6XqjOhBEpRb7Zry8/7NeBGiXPcmEuU6bOr+CY/zRhbrU2oQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAj1L07kf4PSgaC8ixQ7WUI0GOFeqllH3dvfs5fgGKbnJlKCCHKKRhpMVM3/04b6UbrBhnzxUlaukzVGc2UrrIkFGcVg7jnh46V85pHU2ixXlzpXuY5jAEctzFCTuW1kRfdmUf5Eq55Mq7n+7/xbrnRIJoDBrHVJ2qm1XOPSt9TVWUK2cazSrrnndSeiS/DNniXDmLHMq6p7TuQCLOFTqHdZB1z9m+f6WoOGGuLGFb9wydMupXZEni41sHzc49w1hzufLhWPe8uoZhgj5brnRXE2mzf6JEdy+3RrL8WYcDuPmDpwWViN1z6VfVoKd3titF0RDug2sw1U0mSNoMQ1HVay919nGaXEndsyvXS3JiZHKl+8iqI3FPum/XbfD201z5PDWU7546OG0XG7cwFZYa7BHIcW0+LldC99zsYmNIbLJr41x5wwP/Qzz3XC9nF2offzftVy7tB8mhnHu2+trYhTHUFGqSXOHnHJRjCc1zT6JiCgJdeozg2xqV5gq7Gqxo81j3rPVVGVKH3zUtgLo0VzhNklIpf07jfq65Bv/h1a8cLEY2V9i0jYPFWH8yyRUuahwrxjrDo+J+5VEwUeM4MZYRWtVWYi3FuzbofYp3R/lFjhODbuvenrVUV94gT1fvTLqU48QwA5eB9pGMqd4vbDoUK0b1F8xODK9CXddXPJXbd8f4Zewz/8WkjL23CRfqt6wxDePBZ5DiB/SDe93yyt4U3JosF/cU3xVD6ZK76/Y1kldiVObixsYx8mI0zTP3V1RdL3IaC4rE8HYD6ragyNjphU/9mRejnp69TVtc1hTd65Zk5YOUc8+auRjddTG9bNvwioc2vrcxhtk3S8MwFwOjJMm3DKknMbIv1KWCXi4I7222zBgapu4pMmIosX4y5tTwd4M2yb1dNd/mdRXJuufIKUlyYtCW/beMGl6JrWf+onuV2Ca9nHv2XOrwnTRN1P5BMsGt/tAy7E/ar9WsHCMTkOsIylSNV57hsO7Jp/bcSALytsy30Yv1ekxZ0TMxnHvm5tB/NUlA/iAj2X9iF0+SOsNhy6+RW8NIAvLnIZae0e3j2v9d3KfLdGuSCtR+zbasZKXp9xP3CF24w8B1uG45YBmbqNy92/ese5bM3FOkARWBFvKyfUxkJiXUuhf0qRhCuA1xrHrVlTigORRDTmZKMzOqzYjhbSfm1zCSKnKSsRq0ze5muoaMGIzdUyQBFbEWyyB0c5Ey3YCSVq+ee/JLkjigzJEjwy0dZqQtw3NP9mIoSrLEcn0lxu4Pz7YTcyF8u1VGBRNfaoj23v1wZ3QYgx+BGC+yRMq0q/Sq80FPBFrDufNsGJEY8YlNn7RvDRagRnJH2Tj6hSYQ40WW5NaCwtW43jYrhrXnhi9GuG8rJg3xydLk0+nkX08gxtT3l4VpZ1h4rFwXvixGfBiDD0GadK940ZsEXJm6pwjWWr9NlxWDa7MQnhhl/X3MnJY/7J9Z1p4bh+zPEO7A2sRYi4M2q7iD0BXEUOYQDmP3FIdtY1L6EE7P2j3FoVsfSdxntvXWyoFi6HMWb47mh/yDHcKMaYqfw9spAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfyn+Kly7OBZVu/QAAAABJRU5ErkJggg==';
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const copyLink = (pin) => {
  console.log('copy')
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.value = `${PRODUCTION_ADDRESS}/joinGame/${pin}`;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}
