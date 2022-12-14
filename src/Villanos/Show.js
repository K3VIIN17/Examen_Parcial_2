import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc, addDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  
  const [ nombrereal, setnombrereal ] = useState('')
  const [ nombredevillano, setnombredevillano ] = useState('')
  const [ edad, setedad] = useState('')
  const [ afiliacion, setafiliacion ] = useState('')
  const [ descripcion, setdescripcion ] = useState('')
  
  
  
  
  const productsCollection = collection(db, "heruesyvillanos")
  
  const store = async (e) => {
    
    e.preventDefault()
    
    await addDoc( productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion, tituloarea: tituloarea.languages } )
    window.location.href = window.location.href;
    // or
    window.location.replace('');
  }


  //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore


  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
       
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "heruesyvillanos", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )

  const [tituloarea, setUserInfo] = useState({
    languages: [],
    response: [],
  });
  
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = tituloarea;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };

  const Borrar =()=>   {
    window.location.href = window.location.href;
}

  //7 - devolvemos vista de nuestro componente
  return (
    <div class="container">
  <div class="row">
  
    <div class="col">
    <h1>Creación de Super Héroes</h1>

                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre real</label>
                        <input
                            value={nombrereal}
                            onChange={ (e) => setnombrereal(e.target.value)} 
                            type="text"
                            className='form-control'
                            pattern="[A-Za-z]+"
                            required
                        />
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Nombre de Súper Héroe</label>
                        <input
                            value={nombredevillano}
                            onChange={ (e) => setnombredevillano(e.target.value)} 
                            type="text"
                            className='form-control'
                            pattern="[A-Za-z]+"
                            required
                        />
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Edad</label>
                        <input
                            value={edad}
                            onChange={ (e) => setedad(e.target.value)} 
                            type="text"
                            className='form-control'
                           
                            pattern="[0-9]+" 
                            
                        />
                    </div>  
                    <div className='mb-3'>
                      

                      
                       <div className='mb-3'>
              <label className='form-label'><b>Sexo</b></label>
              <br />
              <label className='form-label'>Mujer</label>
              <input type="radio" name='Sexo' value=' Mujer' onChange={(e) => setafiliacion(e.target.value)} required/>
              <br />
              <label className='form-label'>Hombre</label>
              <input type="radio" name='Sexo' value='Hombre' onChange={(e) => setafiliacion(e.target.value)} required/>
              <br />
              <label className='form-label'>No especificado</label>
              <input type="radio" name='Sexo' value='No especificado' onChange={(e) => setafiliacion(e.target.value)} required/>
              <br />

            </div>


            <div className='mb-3'>
              <label className='form-label'><b>Origen</b></label>
              <br />
              <label className='form-label'>Natural Humano</label>
              <input type="radio" name='origen' value=' Natural Humano' onChange={(e) => setdescripcion(e.target.value)} required/>
              <br />
              <label className='form-label'>Extraterrestre</label>
              <input type="radio" name='origen' value='Extraterrestre' onChange={(e) => setdescripcion(e.target.value)} required/>
              <br />
              <label className='form-label'>Experimento Científico</label>
              <input type="radio" name='origen' value='Experimento Científico' onChange={(e) => setdescripcion(e.target.value)} required/>
              <br />
              <label className='form-label'>Mutante</label>
              <input type="radio" name='origen' value='Mutante' onChange={(e) => setdescripcion(e.target.value)} required/>
              <br />

            </div>

           


            <div className="container-fluid top ">
        <div className="container mt-5  pb-5 pt-5">
          <h3 className="form-head-contact-h3 ">
           Titulo de área : Caracteristicas{" "}
          </h3>
  
         
            <div className="row">
              <div className="col-md-6">
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Volador"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Volador
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Velocidad"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Velocidad
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Fuerza"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Fuerza

                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Mutante"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Mutante
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Visión"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Visión
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Oído"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Oído
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Invulnerabilidad"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Invulnerabilidad
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Telepatia"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Telepatia
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Lanza Rayos"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Lanza Rayos
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Artes Marciales"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Artes Marciales
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Inteligencia"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Inteligencia
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Acrobacia"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Acrobacia
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Armadura"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Armadura
                  </label>
                </div>

                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value="Tecnología"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Tecnología
                  </label>
                </div>
              </div>
            </div>
  
            
         
        </div>
      </div>
           
      

          
      
             </div>
                    <button type='submit' className='btn btn-primary'>Enviar</button>
                    <button type='submit' onClick={() => Borrar()} className='btn btn-primary'>cancelar</button>
                    

           
                 </form>
                    
    </div>
    <div class="col">
    <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre real</th>
                <th>Nombre de Súper Héroe</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Origen</th>
                <th>Titulo area</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.nombrereal}</td>
                  <td>{product.nombredevillano}</td>
                  <td>{product.edad}</td>
                  <td>{product.afiliacion}</td>
                  <td>{product.descripcion}</td>
                 
                  <td>{product.tituloarea.toString()}</td>
                  <td>
                 
                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
    </div>
  </div>
  </div>
  )
}

export default Show