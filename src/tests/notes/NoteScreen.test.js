import { mount } from "enzyme";
import { NoteScreen } from "../../components/notes/NoteScreen";
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from "react-redux";

// necesario para crear un store
    import configureStore from 'redux-mock-store' //ES6 modules
    import thunk from 'redux-thunk'


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
            id:1234,
            title: 'Hola',
            body: 'mundo',
            date:0
            
        },
        notes: []     
    }
}

let store = mockStore(//para probar la funcion necesitamos un uid del usuario
    initState
    )
    //--
    
    
    
    
//para saber si se llamo startLogout
    import { activeNote } from "../../actions/notes";
            jest.mock('../../actions/notes',() =>({
                activeNote: jest.fn()
                }));
            
    //estan dentro de un dispatch
    store.dispatch = jest.fn();

 //--
describe('Pruebas en <NoteScreen/>', () => {
    const wrapper= mount(
        <Provider store={store}>
            
                <NoteScreen/>
            
        </Provider>)
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })
    test('debe de disparar el active note ', () => {
        
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola de nuevo'
            }
        })
        //verificamos que fue llamada
        expect(activeNote).toHaveBeenCalledWith( //mira el ultimo cambio
            1234,
            {
                body: 'mundo',
                title: 'Hola de nuevo',
                id:1234,
                date:0
            }
        );
    })
    
    
})
