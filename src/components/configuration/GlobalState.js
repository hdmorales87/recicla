import { createStore } from 'redux'; 

/**
 * globalState Estado global con parametros usados en diferentes componentes
 * type:
 * windowOpen  = Estado de la ventana modal
 * @author Hector Morales <warrior1987@gmail.com>
 */
const globalState = (state={ params: {} },action) =>{
    return  {
                ...state,
                type:action.type,
                [action.type] : action.params
            }
}

export default createStore(globalState,{params: {}});