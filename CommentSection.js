import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

// import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
  console.log(post);
  const classes = useStyles();
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleComment = () => {
    const finalComment = `${user.result.name}: ${comment}`

    // dispatch(commentPost(finalComment, post._id));
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              Comment {i}
            </Typography>
          ))}
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField
            fullWidth 
            rows={3} 
            variant="outlined" 
            // label="Comment" 
            multiline 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            />
            <br />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;