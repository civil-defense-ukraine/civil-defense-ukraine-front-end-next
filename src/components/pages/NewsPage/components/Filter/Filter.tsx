'use client'

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames';

export const Filter = () => {
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const categories = ['All categories', 'News', 'Events', 'Reports'];
  const sortBy = ['Recent', 'Oldest'];

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <FilterItem
          options={categories}
          name="category"
          selectedDropdown={selectedDropdown}
          setSelectedDropdown={setSelectedDropdown}
        />
      </div>
      <div className={styles.sort}>
        <p className={styles.sort__name}>Sort by:</p>
        <div className={styles.sort__item}>
          <FilterItem
            options={sortBy}
            name="sortBy"
            selectedDropdown={selectedDropdown}
            setSelectedDropdown={setSelectedDropdown}
          />
        </div>
      </div>
    </div>
  );
};

type Props = {
  options: string[];
  name: string;
  selectedDropdown: string;
  setSelectedDropdown: Dispatch<SetStateAction<string>>;
};

export const FilterItem: React.FC<Props> = ({
  options,
  name,
  selectedDropdown,
  setSelectedDropdown,
}) => {
  // Get the current query params directly from the window.location.search
  const queryParams = new URLSearchParams(window.location.search);
  const selectedOption = queryParams.get(name) || options[0];  // Default to first option

  const restOptions = useMemo(() => {
    return options.filter(item => item !== selectedOption);
  }, [selectedOption]);

  const onSelect = (newSelectedOption: string) => {
    const updatedQuery = new URLSearchParams(window.location.search);

    if (newSelectedOption === 'All categories' || newSelectedOption === 'Newest') {
      updatedQuery.delete(name);
    } else {
      updatedQuery.set(name, newSelectedOption.toLowerCase());
    }

    // Remove 'page' query parameter when selecting a new option
    updatedQuery.delete('page');

    // Update the URL without reloading the page
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${updatedQuery.toString()}`
    );

    setSelectedDropdown('');
  };

  return (
    <div
      style={{ '--itemCount': `${options.length}` } as React.CSSProperties}
      className={classNames(`${styles.filterContainer}`, {
        [styles.filterContainer__open]: selectedDropdown === name,
      })}
      onMouseLeave={() => setSelectedDropdown('')}
    >
      <div
        className={styles.title}
        onClick={() => setSelectedDropdown(prev => (prev === name ? '' : name))}
      >
        <p
          className={classNames({
            [styles.title__text]: selectedDropdown === name,
          })}
        >
          {selectedOption}
        </p>
        <div
          className={classNames(`icon icon--arrow ${styles.icon}`, {
            [styles.icon__open]: selectedDropdown === name,
          })}
        ></div>
      </div>

      <ul
        className={classNames(`${styles.filterItems}`, {
          [styles.filterItems__open]: selectedDropdown,
        })}
      >
        {restOptions.map(item => {
          return (
            <li
              key={item}
              onClick={() => {
                onSelect(item);
              }}
            >
              <p className={`${styles.filterItem}`}>{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
