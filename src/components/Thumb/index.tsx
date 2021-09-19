import React from 'react';

// Routing
import {Link} from 'react-router-dom';

// Styles
import { Image} from './Thumb.styles';

type Props = {
  image: string;
  movieId?: number;
  clickable: boolean;
}

const Thumb : React.FC<Props> = ({ image, movieId,clickable}) => {

    const link = "/" + movieId;

    return ( 
      <div>
        {
          clickable ? 
            <Link to={link}>
              <Image src={image} alt='movie-thumb'/>
            </Link>
            :
            (
              <Image src={image} alt='movie-nolink-thumb'/>
            )
        }

     </div>
    )
  };

  
export default Thumb;