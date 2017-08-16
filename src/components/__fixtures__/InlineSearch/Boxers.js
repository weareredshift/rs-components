import React from 'react';

export default {
  props: {
    options: [
      {
        name: 'Conor McGregor',
        image: <img src="http://media.ufc.tv/fighter_images/Conor_McGregor/205-McGREGOR_CONOR.png" />,
        onAction: (item) => console.log(item)
      },
      {
        name: 'Floyd Mayweather',
        image: <img src="http://thesource.com/wp-content/uploads/2017/08/fm-e1433941678273.jpg" />,
        onAction: (item) => console.log(item)
      },
      {
        name: 'Muhammad Ali',
        image: <img src="https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg" />,
        onAction: (item) => console.log(item)
      }
    ],
    placeholder: 'Type   here...'
  }
};
