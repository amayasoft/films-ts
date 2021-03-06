import React  from 'react';

// Config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';

// components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';
// hook
import { useHomeFetch  }  from '../hooks/useHomeFetch'

// images
import NoImage from '../images/no_image.jpg';



const Home : React.FC = () =>  {
  
    const {state, loading, error,setSearchTerm, searchTerm,setIsLoadingMore } = useHomeFetch();

    if (error) return <div>Something went wrong ...</div>;
   
    return (
        <>
            {!searchTerm && state.results  && state.results[0] ? (
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
            ) : null}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                {
                    state.results.map(movie => (
                        <Thumb key={movie.id} 
                            clickable
                             image = {
                                movie.poster_path
                                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                    : NoImage
                            }
                            movieId={movie.id}
                        >{movie.title}</Thumb>
                    ))
                }
            </Grid>
            { loading && (<Spinner />) }
            {
                state.page < state.total_pages && !loading && (
                    <Button text="load more" callback={() => setIsLoadingMore(true)}/>
                )
            }
        </>
    );
};

export default Home;