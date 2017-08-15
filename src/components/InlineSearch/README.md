# InlineSearch

The InlineSearch component renders an input that searches through a given set of items as you type. If a matching item is found, it surfaces that first hit in the input, along with any relevant imagery associated with the item, and highlights the matching section of the match.

```jsx
<InlineSearch
  options={ [
    { name: 'Conor McGregor', image: <img width="100px" src="http://media.ufc.tv/fighter_images/Conor_McGregor/205-McGREGOR_CONOR.png" /> },
    { name: 'Floyd Mayweather', image: <img width="100px" src="http://thesource.com/wp-content/uploads/2017/08/fm-e1433941678273.jpg" /> },
    { name: 'Muhammad Ali', image: <img width="100px" src="https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg" /> }
  ] }
/>
```

The above component will render an empty input field. When a user begins to input, the field will fill with their text, and when a match is found, it will show that match, with the matching text highlighted and any image (if given) displayed to the left.