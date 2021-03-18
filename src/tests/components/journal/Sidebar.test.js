import { mount } from "enzyme";
import { Sidebar } from "../../../components/journal/Sidebar";

import React from 'react';
import { Provider } from "react-redux";

// necesario para crear un store
    import configureStore from 'redux-mock-store' //ES6 modules
    import thunk from 'redux-thunk'
import { MemoryRouter } from "react-router";


    const middlewares = [thunk];
    const mockStore = configureStore(middlewares); //funcion para crear un store
//--
//inicializar el store
const initState = {
    auth: {
        uid: '123',
        name: 'fernando'
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes: { //necesita un active para la prueba de debe: de llamar el login si estoy autenticado
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


//para saber si se llamo startNewNote
    import { startNewNote } from "../../../actions/notes";
    jest.mock('../../../actions/notes',() =>({
        startNewNote: jest.fn()
    }));

//--

//para saber si se llamo startLogout
    import {startLogout} from '../../../actions/auth';
    jest.mock('../../../actions/auth',() =>({
        startLogout: jest.fn()
    }));

    //estan dentro de un dispatch
    store.dispatch = jest.fn();

//--

describe('Pruebas en <sidebar/>', () => {
    
    const wrapper= mount(
        <Provider store={store}>
            
                <Sidebar/>
            
        </Provider>)

    test('debe de mostrarse correctamente ', () => {

        
        expect(wrapper).toMatchSnapshot();

    });
    test('debe de llamar el startlogout', () => {

        //tenemos que simular un click
        wrapper.find('button').prop('onClick')();
        //verificamos que fue llamada
        expect(startLogout).toHaveBeenCalled();

    });
    test('debe de llamar el startNewNote', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();
        //verificamos que fue llamada
        expect(startNewNote).toHaveBeenCalled();
        

    });
    
    
})
