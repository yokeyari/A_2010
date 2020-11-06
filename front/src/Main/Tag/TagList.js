import React, { useState } from 'react'
import { TagDataSource } from '../ProductionApi';
import  TagComponent from './TagComponent';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const useStyles = makeStyles((theme) => ({
    card: {
      width: '40vw',
      maxHeight: '50vh',
      overflow: 'auto',
      //margin: theme.spacing(2),
      margin: '10px 10px 10px 5vw',
      padding: theme.spacing(2),
      //backgroundColor:"#D2B48C",
    },
  }
  ));

const TagApi = new TagDataSource();

function TagList(props) {
  const classes = useStyles();
  const tags = props.tags;

  function handleChange(tag) {
    props.withUpdate(TagApi.updateManualTag(tag));
  }

  function handleDelete(tag) {
    props.withUpdate(TagApi.deleteTag(tag));
  }

  return (
    <>
      <FormGroup row>
        {
          tags.map(tag =>
            (
            <TagComponent
              key={tag.id.toString()}
              text={tag.text}
              tag={tag}
              onChange={handleChange}
              onDelete={handleDelete}
            />

            )
          )
        }
      </FormGroup>
    </>
  )
}

export default TagList