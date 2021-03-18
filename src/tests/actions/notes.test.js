// necesario apra crear un store
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares); //funcion para crear un store
//--

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

//--startUploading
import { fileUpload } from '../../helpers/fileUpload';
jest.mock( '../../helpers/fileUpload', () =>({ //la funcion fileUpdate devuelve un url del archivo cargado
    fileUpload: jest.fn( ()=>{
        //return 'https://hola-mundo.com/cosa.jpg' //devolvera esto
         return Promise.resolve('https://hola-mundo.com/cosa.jpg'); //es lo mismo que lod e arriba en este caso 
    })
}))
//--


const initState = {
    auth: { 
        uid: 'TESTING' 
    },
 //necesita para test startUploading
    notes: {
        active:{
            id:'fk0ek3StsVOwiK4W7knO',
            title: 'Hola',
            body: 'Mundo',
        }
    }
 //--   
}

let store = mockStore(//para probar la funcion necesitamos un uid del usuario
    initState
)

describe('Pruebas con las acciones de notes', () => {
   
    beforeEach(()=>{ //se eejcuta antes de cada prueba
        store= mockStore(initState); // reinicia el store para que no queden las secuencia de acciones guardas
   })
    test('debe de crear una nueva nota en startNewNote', async () => {
        
        await store.dispatch( startNewNote() ); //activamos esta accion de la nota

        const action = store.getActions(); //obtiene todas las acciones realizadas en el store

        //console.log(action); //para ver las acciones primero un "active note" despues un "new note" 

        //prueba de active notes 
        expect(action[0]).toEqual({
            type: types.notesActive, // active notes es la accion
            payload: {
              id: expect.any(String), //sabes que devuelve un String
              title: '',
              body: '',
              date: expect.any(Number) //sabemos que devuelve un numero
            }
        })
        //prueba de new notess 
        expect(action[1]).toEqual({
            type: types.notesAddNew, // addnotes es la accion
            payload: {
              id: expect.any(String), //sabes que devuelve un String
              title: '',
              body: '',
              date: expect.any(Number) //sabemos que devuelve un numero
            }
        })
 
        //borraremos la nota que subimoas para no cargar la nube
        const docId = action[0].payload.id; //obtengo el id de la nota que acabo de subir 

        //comando para vincular con la base de dato nube
        await db.doc(`${ 'TESTING' }/journal/notes/${ docId }`).delete(); //comando para borrar la nota delete"
 
    })
    test('startLoadingNotes debe de cargar las notas ', async() => {
        await store.dispatch( startLoadingNotes('TESTING' ) ); //activamos esta accion de la nota y necesita uid="testing"

        const actions = store.getActions(); //obtiene todas las acciones realizadas en el store
        //console.log(action)
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array) //para saber que tiene un arreglo 
        });

        // verificar cada elemento de la nota

        const expected= { //estrutura de una nota
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected); //verificamos que tenga esa estructura


    })
    test('startSaveNote debe de actualizar la nota ', async() => {
        //nota a actualizar
        const note= {
            id: 'fk0ek3StsVOwiK4W7knO', //esta en la bd 
            title: 'titulo',//cambio
            body: 'body' 
        }
        await store.dispatch( startSaveNote(note) )

        const actions = store.getActions(); //obtiene todas las acciones realizadas en el store
        //console.log(actions) //mostramos acciones 

        expect(actions[0].type).toBe( types.notesUpdated ) //verificamos si se actualizo "update"

        //obtenemos la nota cargada 
        const docRef = await db.doc(`${ 'TESTING' }/journal/notes/${ note.id }`).get(); 

        //comprobamos que el titulo sea igual al que subimos
        expect(docRef.data().title).toBe(note.title);


    })
    test('startUploading debe actualizar el url del entry', async() => {
        
        const file = new File([],'foto.jpg');
        await store.dispatch( startUploading( file ) )

        const docRef = await db.doc(`${ 'TESTING' }/journal/notes/fk0ek3StsVOwiK4W7knO`).get(); 
        expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");

    })
    
    
    
})