import {useState, useEffect} from 'react';

// API
import API , {Crew,Cast, Movie,Credits}  from '../API';
// Helpers
import { isPersistedState } from '../helpers';

// Types
export type MovieState = Movie & { actors: Cast[]; directors: Crew[] };

export const useMovieFetch = (movieId:number) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    
    const  fetchMovie= async(movieId:number) => {
        try {
           
            setError(false);
            setLoading(true);
            const movie : Movie = await API.fetchMovie(movieId);
            const credits : Credits = await API.fetchCredits(movieId);
            // Get directors only
            const directors : Crew[] = credits.crew.filter(
             member => member.job === 'Director'
            );

            setState({
                ...movie,
                actors: credits.cast,
                directors
            });
            setError(false);
            setLoading(false);
        } catch(error) {
            setError(true);
            setLoading(false);
        }


        
    }


    useEffect(() => {
        const sessionState = isPersistedState(movieId.toString());
        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
          }
        fetchMovie(movieId);
    }, [movieId]);

    // Write to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
    }, [movieId, state]);



    return {state, loading, error};
}

export default useMovieFetch;