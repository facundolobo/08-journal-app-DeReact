import {createSerializer} from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


//para saber si se llamo --para evitar el error de query...
import Swal from 'sweetalert2';
 
jest.mock('sweetalert2',() =>({
    fire: jest.fn(),
    close: jest.fn() //no se coloca Swal -> debe ser fire cuando es una importacion por defec
}));
//--


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));


//para evitar el error de window.scrollTo que es llamado en el test "startUploading debe actualizar el url del entry" 
const noScrooll = ()=>{};
Object.defineProperty(window, 'scrollTo', {value: noScrooll, writable: true} );


