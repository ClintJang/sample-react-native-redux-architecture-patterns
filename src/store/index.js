import reducers from '../reducers';
import { createStore } from 'redux';

export default function initStore() {
    const store = createStore( 
        reducers,
        applyMiddleware(
            // Middleware will not be applied to this sample.
        ), 
    );
    return store;
}