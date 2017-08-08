import React from 'react';

export default {
  props: {
    uid: 'objectTable',
    columns: [
      { name: 'Name', allowSortBy: true },
      { name: 'Age', allowSortBy: true },
      { name: 'Gender', allowSortBy: true },
      { name: 'Unsortable Random', allowSortBy: false }
    ],
    rows: [
      [
        { columnName: 'Name', fieldValue: 'Jack' },
        { columnName: 'Age', fieldValue: '28' },
        { columnName: 'Gender', fieldValue: 'M' }
      ],
      [
        { columnName: 'Name', fieldValue: 'Jill' },
        { columnName: 'Age', fieldValue: '32' },
        { columnName: 'Gender', fieldValue: 'F' },
        { columnName: 'Unsortable Random', fieldValue: 'Pretty cool name.' }
      ],
      [
        { columnName: 'Name', fieldValue: 'Pat' },
        { columnName: 'Age', fieldValue: '32' },
        { columnName: 'Gender', fieldValue: '?',
          fieldContent: <img
            src="https://www.lifezette.com/wp-content/uploads/2016/04/298216_full.jpg"
            alt="It's Pat!"
            width={ 50 }
            height={ 50 }
          />
        },
        { columnName: 'Unsortable Random', fieldValue: 'It\'s Pat!' }
      ]
    ]
  }
};
