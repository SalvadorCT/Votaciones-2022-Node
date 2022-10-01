const consultar = async() => {
    try{
        const respuesta = await fetch('http://localhost:3000/candidato',{
            method: 'GET'
        });
        console.log(respuesta);
        console.log(respuesta.status);
        console.log(await respuesta.json());
        console.log('La peticion fue exitosa');

    }catch(error){
        console.log('La peticion fallo');
    }
}

consultar();
    // .then((res)=>{
    // console.log(res);
    // })
    // .catch((err)=>{
    // console.log(err);
    // })
const crearCandidato = document.getElementById("btn-crear")
const dni = document.getElementById("dni")

async function registrar(evento){
    evento.preventDefault();
    console.log("me hizo click");
    console.log(dni.value);
    const valorDni = dni.value;
    if (valorDni === "") {
        alert("El dni no puede estar vacio");
    }
    try{
        const resultado = await fetch('http://localhost:3000/votante',{
            method: 'POST',
            body: JSON.stringify({dni:valorDni}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await resultado.json();
        
        if(resultado.status === 400){
            alert(json.message);
        }else{
            alert("exitos");
            //TODO: redireccionar a la pagina de votacion
        }

        console.log(json);

    }catch(error){
        console.error("Error al crear al votante");
    }
}
crearCandidato.addEventListener("click",registrar);
