//import { traverseTwoPhase } from "react-dom/test-utils"

import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";



describe(' Pruebas en authReducer', () => {

    

    test('debe realizar login ', () => {


        const initState = {
            uid: 'askpdjoapsmdo1231234',
            displayName: 'Fernando'
        }



        //creamos una accion para enviar 
        const action = {
            
            type:types.login,
            
            payload: {
                uid: 'askpdjoapsmdo1231234',
                displayName: 'Fernando'
            }
        }


        const state = authReducer( initState, action); 
        expect(state).toEqual({ 
            uid: 'askpdjoapsmdo1231234',
            name: 'Fernando' 
        }
        ) //comprobamos si retorna 
    })


    test('debe realizar  logout ', () => {

        const initState = {
                uid: 'askpdjoapsmdo1231234',
                displayName: 'Fernando'
            }


        //creamos la accion logout
        const action = {
            type:types.logout,
            //payload: usuario
        }

        const state = authReducer( initState , action);
        expect(state).toEqual({}) //comprobamos q regresa un objeto vacio


    })

    test('accion logout ', () => {
        const initState = {
            uid: 'askpdjoapsmdo1231234',
            displayName: 'Fernando'
        }

        //creamos una accion que no esta en auth
        const action = {
            type: 'sin accion',
            //payload: usuario
        }

        const state = authReducer( initState , action);

        //console.log(state)
        expect(state).toEqual(initState)
    })
    
})
