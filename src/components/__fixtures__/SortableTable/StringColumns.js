import React from 'react';

export default {
  props: {
    uid: 'stringTable',
    columns: ['Name', 'Age', 'Gender'],
    rows: [
      [
        { columnName: 'Name', fieldValue: 'Jack' },
        { columnName: 'Age', fieldValue: '28' },
        { columnName: 'Gender', fieldValue: 'M' }
      ],
      [
        { columnName: 'Name', fieldValue: 'Jill' },
        { columnName: 'Age', fieldValue: '32' },
        { columnName: 'Gender', fieldValue: 'F' }
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
        }
      ]
    ]
  }
};
