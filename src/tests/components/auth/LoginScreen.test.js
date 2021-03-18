import React from 'react';
import { mount } from "enzyme"
import '@testing-library/jest-dom'
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';




// necesario apra crear un store
    import configureStore from 'redux-mock-store' //ES6 modules
    import thunk from 'redux-thunk'

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares); //funcion para crear un store
    //--

//inicializar el store
    const initState = {
        ui:{
            loading: false,
            msgError: null
        }
    }

    let store = mockStore(//para probar la funcion necesitamos un uid del usuario
        initState
    )
//--


//para saber si se llamo startGoogleLogin y startLoginEmailPassword
    import { startGoogleLogin, startLoginEmailPassword} from '../../../actions/auth';
    jest.mock('../../../actions/auth',() =>({
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }));

    //estan dentro de un dispatch
    store.dispatch = jest.fn();

//--



//cracion de wrapper con el provider para enviar el store que lo necesita
const wrapper= mount(
    <Provider store={store}>
        <MemoryRouter> {/* utiliza la etiqueta link por lo tanto necesita memoryrouter para fingir rutas */}
            <LoginScreen/>
        </MemoryRouter>
    </Provider>)



describe('Pruebas en <loginScreen/>', () => {
    
    beforeEach(()=>{//reinica store en cada test
        store= mockStore(initState);
        jest.clearAllMocks();//limpia los monks
    })

    test('debe de mostrarse correctamente ', () => { 

        expect(wrapper).toMatchSnapshot();
        
    })

    test('debe de disparar la accion startGoogleLogin', () => {
        //tenemos que simular un click
        wrapper.find('.google-btn').prop('onClick')();

        //verificamos que fue llamada
        expect(startGoogleLogin).toHaveBeenCalled();

    })
    test('debe de disparar el startLogin con los respectivos argumentos ', () => {
        //tenemos que simular un submit
        wrapper.find('form').prop('onSubmit')({preventDefault(){}}); //necesita el preventDefault
        expect(startLoginEmailPassword).toHaveBeenCalledWith("", "");


    })
    
    
    
})
