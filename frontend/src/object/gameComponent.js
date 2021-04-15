import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function GameComponent ({ game }) {
  return <>
      <div>Picture {game.thumbnail}</div>
        <div>title {game.title}</div>
        <div>ID: {game.id}</div>
        <Link to={{
          pathname: '/editGames/' + game.id + '/question0',
          state: {
            game: game
          }
        }
        }>
          <button>Edit</button>
        </Link>

    </>
}
GameComponent.propTypes = {
  game: PropTypes.object
};
