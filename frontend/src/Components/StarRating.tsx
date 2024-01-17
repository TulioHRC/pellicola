import React from 'react';
import { Rating } from '@mui/material';

interface StarRatingProps {
    rating: string;
  }

function StarRating ({rating}: StarRatingProps) {
  return (
    <Rating
      name="read-only"
      value={Number(rating) / 2} // 0-10 scale to 0-5
      precision={0.5}
      readOnly
    />
  );
};

export default StarRating;
