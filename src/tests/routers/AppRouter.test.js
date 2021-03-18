import React from 'react';
import { mount } from "enzyme"
import '@testing-library/jest-dom'



import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AppRouter } from '../../routers/AppRouter';

// necesario para crear un store
    import configureStore from 'redux-mock-store' //ES6 modules
    import thunk from 'redux-thunk'


    const middlewares = [thunk];
    const mockStore = configureStore(middlewares); //funcion para crear un store
    //--

//inicializar el store
    const initState = {
        auth: {},
        ui:{
            loading: false,
            msgError: null
        },
        notes: { //necesita un active para la prueba de debe de llamar el login si estoy autenticado
            active:{
                id:'abc',
                
            },
            notes: []     
        }
    }

    let store = mockStore(//para probar la funcion necesitamos un uid del usuario
        initState
    )
//--




//para saber si se llamo login
    import { login } from '../../actions/auth';
    import { act } from 'react-dom/test-utils';
    import firebase from 'firebase';
   jest.mock('../../actions/auth',() =>({
        login: jest.fn()
    
    }));

//estan dentro de un dispatch
    store.dispatch = jest.fn();

//--


describe('Pruebas en <AppRouter/>', () => {
    test('debe de llamar el login si estoy autenticado ', async() => {
        //cracion de wrapper con el provider para enviar el store que lo necesita

        let user;

        await act(async()=>{

            const userCred= await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456')
            user = userCred.user;
            

            const wrapper= mount(
                <Provider store={store}>
                    <MemoryRouter> {/* utiliza la etiqueta link por lo tanto necesita memoryrouter para fingir rutas */}
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>)
        })
        expect(login).toHaveBeenCalledWith("SwxsC5yDIOSZTWPuZ7dItWXEXuT2", null);

    })
    
})
