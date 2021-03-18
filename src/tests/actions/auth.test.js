
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

import '@testing-library/jest-dom'

// necesario apra crear un store
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares); //funcion para crear un store
//--
const initState = {}

let store = mockStore(//para probar la funcion necesitamos un uid del usuario
    initState
)


describe('Pruebas con las acciones de Auth', () => {

    beforeEach(()=>{//reinica store en cada test
        store= mockStore(initState);
    })

    test('login y logout deben de crear la acción respectiva', () => {
       

        //login!
                const user={
                    uid: '123',
                    displayName: 'Fernando' 
                }

                const action = login(user.uid,user.displayName);

                //console.log(action);
                //verificamos que se realizo la accion de login
                expect(action.type).toEqual(types.login);

                //verificamos que se envio los datos correctos
                expect(action.payload).toEqual(user);
        //--
        //logout
                

                const action2 = logout();

                //console.log(action2)
                //verificamos que se realizo la accion de logout
                expect(action2.type).toEqual(types.logout);

               

        //--

    });

    test(' debe de realizar el startLogout ', async() => {
        await store.dispatch( startLogout() );
        const actions = store.getActions(); //mostrar acciones que se realiza
        //console.log(actions);

        //verificamos que realiza el logout
        expect(actions[0]).toEqual({ type:types.logout }); 

        //verificamos que realiza el notesLogoutCleaning
        expect(actions[1]).toEqual({ type:types.notesLogoutCleaning }); 
    })

    test('debe iniciar el startLoginEmailPassword ', async() => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com','123456') ); //este usuario ya se creo en firebase
        const actions = store.getActions(); //mostrar acciones que se realiza
        //console.log(actions);

        //verificamos que realiza el login esta e posicion 1
        expect(actions[1]).toEqual({ 
            type:types.login, 
            payload: { 
                    uid: 'SwxsC5yDIOSZTWPuZ7dItWXEXuT2',
                    displayName: null  //no le asignamos un name
                    }            
        });
        
    })
    
    
})
