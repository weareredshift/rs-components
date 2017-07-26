import React from 'react';
import { Link } from 'react-router';
import './Social.scss';

/**
 * Renders inline list of social media icons with anchor links
 * @param {Object} props                        React properties argument
 * @param {Object[]} props.accounts             Array containing objects describing social media icons / urls
 * @param {string} props.accounts[].icon        String defining the className for the social media icon
 * @param {string} props.accounts[].to          String defining the url to route to when the icon is clicked
 * @returns {React.Component}                   Returns a react component
 */
export function Social (props) {
  const { accounts } = props;

  return (
    <ul className="social list--inline">
      { accounts.map((account, index) => (
        <li key={ index } className="mr2">
          <Link to={ account.to }><span className={ account.icon } /></Link>
        </li>
      )) }
    </ul>
  );
};

Social.propTypes = {
  accounts: React.PropTypes.array.isRequired
};

export default Social;
