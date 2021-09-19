import {useState, useEffect,} from 'react';

// API
import API,  {Movies}  from '../API';

// Helpers
import { isPersistedState } from '../helpers';

const initialState : Movies = {
    page:0 ,
    results:[] ,
    total_pages:0 ,
    total_results:0 
}
export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    const  fetchMovies = async(page:number, searchTerm:string ='') => {
        try {
           
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            setState(prev => ({
              ...movies,
              results:
                page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
            setError(false);
            setLoading(false);
        } catch(error) {
            setError(true);
            setLoading(false);
        }
    }

    // initial & search
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
        
            if (sessionState) {
                console.log('Grabbing from sessionStorage');
                setState(sessionState);
                return;
            }
        }
        console.log('Grabbing from API');

        setState(initialState);
        fetchMovies(1,searchTerm);
    }, [searchTerm])

    
    // loadmore
    useEffect(() => {
        if(!isLoadingMore) return;
        fetchMovies(state.page + 1,searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore,searchTerm,state.page])

    return {state, loading, error,setSearchTerm,searchTerm, setIsLoadingMore};
}

export default useHomeFetch;