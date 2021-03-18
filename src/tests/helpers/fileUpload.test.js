//configuracion para el uso de claudinary
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'da0vqwplu', 
    api_key: '997488792129723', 
    api_secret: 'cBBK2sHjKSTvyz9RqaU-AW9tfRo' 
  });
//--

describe('Pruebas en fileUpload', () => {

    test('debe de cargar un archivo y retornar el URL', async ( done ) => { // solo funciona con imagenes png?  //no fucniona bien el done
    
        //creacion del archivo
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/300px-PNG_transparency_demonstration_1.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png'); //no importa mucho el nombre pero si la extención
        //--
        const url = await fileUpload(file); //enviamos imagen y debe devolver un url de claudinary  // se tiene q borrar manual despues

        expect( typeof url ).toBe('string'); 

        //borrar imagen por id
        const segments = url.split('/'); //separamos la url en cada "/"
        const imageId = segments [segments.length -1 ].replace('.png',''); //obtenemos el ultimo segmento (ide de la imagen) y quitamos el .png
        
        //console.log(imageId)
         cloudinary.v2.api.delete_resources( imageId, {}, ()=> { //el done va en el tests
            done();
         });
    })



    test('debe de retornar un error ', async () => { 
    
        // //creacion del archivo sin imagen
         const file = new File([],'foto.png'); //no importa mucho el nombre pero si la extención
        // //--

         const url = await fileUpload(file); //enviamos imagen y debe devolver un url de claudinary  // se tiene q borrar manual despues
         //console.log(url)
         expect( url ).toBe(null); //debe retornar un null

    })
        

})
