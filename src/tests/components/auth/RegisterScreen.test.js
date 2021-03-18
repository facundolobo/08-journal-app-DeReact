import React from 'react';
import { mount } from "enzyme"
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';




// necesario apra crear un store
    import configureStore from 'redux-mock-store' //ES6 modules
    import thunk from 'redux-thunk'
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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
    // import { startGoogleLogin, startLoginEmailPassword} from '../../../actions/auth';
    jest.mock('../../../actions/auth',() =>({
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn()
    }));

//     //estan dentro de un dispatch
//     store.dispatch = jest.fn();

// //--



//cracion de wrapper con el provider para enviar el store que lo necesita
const wrapper= mount(
    <Provider store={store}>
        <MemoryRouter> {/* utiliza la etiqueta link por lo tanto necesita memoryrouter para fingir rutas */}
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>)



describe('Pruebas en <RegisterScreen/>', () => {


    test('debe de mostrarce correctamente  ', () => {
        //const wrapper= shallow(<RegisterScreen/> 

        expect(wrapper).toMatchSnapshot();


    })
    test('dxebe de ahcer el dispatch de la accion respectiva ', () => {


        const emailField= wrapper.find('input[name="email"]'); // vincular a un etiqueta por su name 
        
        //console.log(emailField.exists()) //verificar que si lo encontro y si lo obtuvo

        emailField.simulate('change',{
            target: { //utiliza el useForm entonces necesita el target
                value: '', //cambia a campo vacio
                name: 'email'
            } 
        })

        //tenemos que simular un submit
        wrapper.find('form').prop('onSubmit')({preventDefault(){}}); //necesita el preventDefault
        
        //verificcamos las acciones
        const actions = store.getActions(); //mostrar acciones que se realiza
        //console.log(actions)
        expect(actions[0]).toEqual({
            type: types.uiSetError, 
            payload: 'Email is not valid' 
        })

    })
    test('debe de mostrar la caja de alerta con el error ', () => {
        
        //inicializar el store
            const initState = {
                ui:{
                    loading: false,
                    msgError: 'Email no es correcto' //mensaje que enviamos
                }
            }

            const store = mockStore(//para probar la funcion necesitamos un uid del usuario
                initState
            )
        //--
        //cracion de wrapper con el provider para enviar el store que lo necesita
        const wrapper= mount(
            <Provider store={store}>
                <MemoryRouter> {/* utiliza la etiqueta link por lo tanto necesita memoryrouter para fingir rutas */}
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
            );

            //verificamos que exista la caja
            expect(wrapper.find('.auth__alert-error').exists()).toBe(true);

            //verificamos que el mensaje sea igual al que mkandamos
            expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);

    })
     
    
    
})
