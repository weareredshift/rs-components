import React from 'react';

export default {
  props: {
    options: [
      {
        name: 'Conor McGregor',
        left: <img src="http://media.ufc.tv/fighter_images/Conor_McGregor/205-McGREGOR_CONOR.png" />,
        onAction: () => { window.location = 'http://media.ufc.tv/fighter_images/Conor_McGregor/205-McGREGOR_CONOR.png'; }
      },
      {
        name: 'Floyd Mayweather',
        left: <img src="http://thesource.com/wp-content/uploads/2017/08/fm-e1433941678273.jpg" />,
        onAction: () => { window.location = 'http://thesource.com/wp-content/uploads/2017/08/fm-e1433941678273.jpg'; }
      },
      {
        name: 'Muhammad Ali',
        left: <img src="https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg" />,
        onAction: () => { window.location = 'https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg'; }
      }
    ],
    placeholder: 'Type   here...'
  }
};
