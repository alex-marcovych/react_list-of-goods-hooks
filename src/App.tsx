import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  alph = 'alph',
  length = 'length',
  reverse = 'reverse',
  reset = 'reset',
}

function sortGoods(goods: string[], sortField: string) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.length:
      return preparedGoods.sort((a, b) => a.length - b.length);
    case SortType.alph:
      return preparedGoods.sort((a, b) => a.localeCompare(b));
    case SortType.reset:
      return [...goodsFromServer];
    default:
      return preparedGoods;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('reset');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = sortGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const isOrderUnchanged = visibleGoods.every(
    (item, index) => item === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alph,
          })}
          onClick={() => setSortField(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOrderUnchanged ? (
          <button
            type="button"
            className="button is-danger is-light"
            style={{
              visibility: !isOrderUnchanged ? 'visible' : 'hidden',
            }}
            onClick={() => {
              setSortField(SortType.reset);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
