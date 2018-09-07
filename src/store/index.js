import reducers from '../reducers';
import { createStore } from 'redux';

export default function initStore() {
    const store = createStore( reducers );
    return store;
}

// export default function test() {

// }