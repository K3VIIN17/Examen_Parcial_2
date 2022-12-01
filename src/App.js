

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './PaginaWeb/nav.js';
import Card from './PaginaWeb/card.js';




import Show from './Villanos/Show';
import Edit from './Villanos/Edit';



function app() {
  return (<div>

    
{/* 
<BrowserRouter>
      <Routes>
        <Route path='/' element={ <Show /> } />

        <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
     </BrowserRouter>  */}


   <BrowserRouter>
       
            <Nav />
            <br></br> <br></br> <br></br> <br></br>
            
      <Routes>
        
            <Route path="/" element={<  Card/>} />
           
            <Route path="Show" element={<Show />} />
            <Route path='/edit/:id' element={ <Edit /> } />


          
        
      </Routes>
    </BrowserRouter>
  </div>
   
 
  );
}

export default app;

