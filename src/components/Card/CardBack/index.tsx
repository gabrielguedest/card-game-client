import React from 'react'
import backStar from '../../../assets/icons/back-star.png'
import { CardBack, BackStar } from './style'

export const CardBackComponent = () => (
  <CardBack>
    <BackStar src={backStar} />
  </CardBack>
)