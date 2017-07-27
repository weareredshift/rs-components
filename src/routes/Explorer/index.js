import React from 'react';
import Dropdown from 'components/Dropdown';
import Link from 'components/Link';

export function Explorer (props) {
  const data = props.location.state && props.location.state.someStuff;

  return (
    <div>
      <h1>Explorer</h1>
      <Dropdown
        dropID="whatever"
        items={ ['Whatever', 'Whatever2', 'Whatever3'] }
        title="Whatever Dropdown"
        multipleSelect={ true }
      />

      <p><Link
        to="/other"
        data={ { someStuff: 'isHere' } }
        className="other"
        beforeGo={ (data) => { console.log('opening internal', JSON.stringify(data)) } }
      >
        Internal
      </Link></p>

      <p><Link
        to="www.nyancar.com/mem2"
        data={ { someStuff: 'isHere' } }
        className="third"
        beforeGo={ (data) => { alert('opening external', JSON.stringify(data)) } }
      >
        External
      </Link></p>

      <p><Link
        to="www.nyancar.com/mem2"
        className="third"
        openNewTab={ true }
        beforeGo={ (data) => { alert('Opening external in new tab', JSON.stringify(data)) } }
      >
        External Open New Tab
      </Link></p>

      <p><Link
        to="www.nyancar.com/mem2"
        data={ { someStuff: 'isHere' } }
        className="third"
        openNewTab={ true }
        beforeGo={ (data) => { alert('Opening internal in new tab', JSON.stringify(data)) } }
      >
        Internal Open New Tab
      </Link></p>

      { data && <p>'Received link data: '.concat(JSON.stringify(data))</p> }
    </div>
  );
}

export default Explorer;
