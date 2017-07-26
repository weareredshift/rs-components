import React from 'react';
import Dropdown from 'components/Dropdown';

export function Explorer () {
  return (
    <div>
      <h1>Explorer</h1>
      <Dropdown
        dropID="whatever"
        items={ ['Whatever', 'Whatever2', 'Whatever3'] }
        title="Whatever Dropdown"
        multipleSelect={ true }
      />
    </div>
  );
}

export default Explorer;
