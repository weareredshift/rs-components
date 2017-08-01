import React from 'react';
import './GridSelector.scss';

/**
 * A generic selection component that allows for single-select (radio-style) or
 * multiple-select (checkbox-style) on elements in a grid, with a callback
 * function to report the results.
 *
 * @extends React.Component
 * @param {Object} props
 * @param {function} props.callback - A function to call with the item on selection
 * @param {Object[]} props.items - An array of items to select from
 * @param {string} props.items[].label - The item label to display
 * @param {string} props.items[].img - The asset URL to be used for the item
 * @param {boolean} props.items[].selected - Whether the item should be marked as selected
 */
export function GridSelector (props) {
  const { items, callback } = props;

  const toggleSelection = (selection) => {
    if (callback instanceof Function) {
      callback(selection);
    }
  };

  return (
    <div className="gridselector">
      {
        items && items.map((selection, index) => (
          <div
            className={ `gridselector__item ${selection.selected ? 'is-active' : ''}` }
            key={ index }
            onClick={ () => toggleSelection(selection) }
          >
            <div className="gridselector__icon mb2">
              <div className="gridselector__icon__highlight" />
              <img src={ selection.img } alt={ selection.label } />
            </div>
            <span className="gridselector__item__label typ--medium-grey">{ selection.label }</span>
          </div>
        ))
      }
    </div>
  );
}

GridSelector.propTypes = {
  items: React.PropTypes.array,
  callback: React.PropTypes.func
};

export default GridSelector;
