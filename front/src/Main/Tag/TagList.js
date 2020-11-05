import React, { useState } from 'react'
import { TagDataSource } from '../ProductionApi';
import  TagComponent from './TagComponent';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'

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
      <Card className={classes.card}>
        {
          tags.map(tag =>
            (<TagComponent
              key={tag.id.toString()}
              text={tag.text}
              tag={tag}
              onChange={handleChange}
              onDelete={handleDelete}
            />)
          )
        }
      </Card>
    </>
  )
}

export default TagList