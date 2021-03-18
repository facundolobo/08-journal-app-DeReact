import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";

// necesario para crear un store
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


    const middlewares = [thunk];
    const mockStore = configureStore(middlewares); //funcion para crear un store
//--

//inicializar el store
const initState = {}
let store = mockStore(initState)
//--

store.dispatch = jest.fn();

const nota= {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'http://algunlugar.com/foto.jpg'
}


const wrapper= mount(
    <Provider store={store}>
        
            <JournalEntry {...nota}/>
        
    </Provider>)

describe('Pruebas en <JournalEntry/>', () => {
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })
    test('debe de activar la nota ', () => {
        //simulamos click
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(nota.id,{...nota})
        )

    })
    
    
})
