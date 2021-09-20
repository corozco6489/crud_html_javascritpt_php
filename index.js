var url = "http://localhost/crud_automoviles/";









var automoviles = new function(){

    this.tablaregistro=document.getElementById("tablaregistro");
    this.nombre=document.getElementById("nombre");
    this.apellido=document.getElementById("apellido");
    this.cedula=document.getElementById("cedula");
    this.placa=document.getElementById("placa");
    this.numero=document.getElementById("numero");
    this.editarnombre=document.getElementById("editarnombre");
    this.editarapellido=document.getElementById("editarapellido");
    this.editarcedula=document.getElementById("editarcedula");
    this.editarplaca=document.getElementById("editarplaca");
   


    

    this.LeerTabla= function(){

        
        var datos="";

        fetch(url)
        .then(r=>r.json())
        .then((respuesta)=>{
            console.log(respuesta)
            respuesta.map(
                function(persona,index,array){
                    datos+="<tr>";
                    datos+="<td>"+persona.id+"</td>";
                    datos+="<td>"+persona.nombre+"</td>";
                    datos+="<td>"+persona.apellido+"</td>";
                    datos+="<td>"+persona.cedula+"</td>";
                    datos+="<td>"+persona.placa+"</td>";
                    datos+='<td>  <div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modelId" onclick="automoviles.Editar('+persona.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="automoviles.Eliminar('+persona.id+')">Eliminar</button></div>'+'</td>';

                    datos+="</tr>";
                

            });
            return this.tablaregistro.innerHTML=datos;
        })
        .catch(console.log)

        
    }

    

    this.Agregar=function(){
        console.log(this.nombre.value);
        console.log(this.apellido.value);


        var datosEnviar={nombre:this.nombre.value,apellido:this.apellido.value,cedula:this.cedula.value,placa:this.placa.value};

        fetch(url+"?insertar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
        .then(respuesta=>respuesta.json)
        .then((datosRespuestas)=>{
            console.log("Insertados");

            alertify.success("Agregado con exito :)")

           
            
        })
        .catch(error => alertify.error("Fallo el servidor :("));
        
        
    }

    this.Eliminar=function(id){

        


      

        console.log(id);

        fetch(url+"?borrar="+id)
        .then(respuesta=> respuesta.json())
        .then((datosRespuestas)=>{
            console.log("Eliminados");
            alertify.success("Eliminado con exito :)")

            this.LeerTabla();
        }).catch(error => alertify.error("NO se pudo Eliminar el registro :("))




    }

    this.Editar = function(id){
        console.log(id);

        this.id="";



        fetch(url+"?consultar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuestas)=>{

            console.log(datosRespuestas);
            
            this.numero=id;       
            this.editarnombre.value=datosRespuestas[0]['nombre'];
            this.editarapellido.value=datosRespuestas[0]['apellido'];
            this.editarcedula.value=datosRespuestas[0]['cedula'];
            this.editarplaca.value=datosRespuestas[0]['placa'];
            console.log(this.numero);
            
            



        })
        .catch(console.log);

    

    }

    this.Actualizar=function(){ 


        
        
        
       



        var datosEnviar={id:this.numero,nombre:this.editarnombre.value,apellido:this.editarapellido.value,cedula:this.editarcedula.value,placa:this.editarplaca.value};
        console.log(datosEnviar);

        fetch(url+"?actualizar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
        .then(respuesta=>respuesta.json)
        .then((datosRespuestas)=>{
            console.log("Actualizados");
            this.editarnombre.value="";
            this.editarapellido.value="";
            this.editarcedula.value="";
            this.editarplaca.value="";
            
            this.LeerTabla();
            
            alertify.success("Actualizado Con Exito :)")
            
                

            })
            .catch(error => alertify.error("NO se pudo Actulizar el registro :("))


        console.log("actualizar");
        this.numero = "";
    }


 
}

automoviles.LeerTabla();
