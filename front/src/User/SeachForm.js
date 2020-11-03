import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';


export default function SearchForm(props) {
  const seachField = <TextField
    type="text"
    value={props.search_word}
    onChange={(e) => { props.onChange(e.target.value) }}
  />;
  
  const seachButton = <Button onClick={props.onClick}>検索</Button>;

  return (
    <div>
      {seachField}
      {seachButton}
    </div>
  )
}