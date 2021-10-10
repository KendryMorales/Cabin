traerClient();

function traerClient(){
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarClient(respuesta.items)
        }
    });
}

function mostrarClient(){
    $.ajax({
        dataType: 'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:'GET',
        
        success:function(respuesta) {
            let item=respuesta.items;

            for(i=0;i<item.length;i++){
                $("#resultadoClient").append("<tbody>");
                $("#resultadoClient").append("<tr>");
                $("#resultadoClient").append("<td>"+item[i].id+"</td>");
                $("#resultadoClient").append("<td>"+item[i].name+"</td>");
                $("#resultadoClient").append("<td>"+item[i].email+"</td>");
                $("#resultadoClient").append("<td>"+item[i].age+"</td>");
                $("#resultadoClient").append('<td><a class="btnO" onclick="obtenerClientEspecifico('+item[i].id+')">Detalle</a></td>');
                $("#resultadoClient").append('<td><button class="btnB"  title="Borrar" onclick="borrarClient('+item[i].id+')">&#10007</button></td>');
                $("#resultadoClient").append("</tr>");
                $("#resultadoClient").append("</tbody>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function guardarClient(){
    let myData={
        id:$("#id_client").val(),
        name:$("#name_client").val(),
        email:$("#email_client").val(),
        age:$("#age_client").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            $("#id_client").val("");
            $("#name_client").val("");
            $("#email_client").val("");
            $("#age_client").val("");
            traerClient();
            alert("¡Se ha registrado la informacion!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }    
    });
}

function editarClient(){     
    let myData={         
        id:$("#id_client").val(),
        name:$("#name_client").val(),
        email:$("#email_client").val(),
        age:$("#age_client").val(),    
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",         
        data:dataToSend,         
        contentType:"application/JSON",         
        datatype:"JSON",         
        success:function(respuesta){             
            $("#resultadoClient").empty();
            $("#id_client").val("");
            $("#name_client").val("");
            $("#email_client").val("");
            $("#age_client").val("");
            traerClient();          
            alert("¡Se ha actualizado el registro!")         
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }   
    }); 
}

function borrarClient(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            traerClient(); 
            alert("¡Se ha borrado el registro!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerClientEspecifico(id_client){
    $.ajax({
        dataType: 'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/"+id_client,
        type:'GET',
        success:function(response) {
            console.log(response);
            let item=response.items[0];
            $("#id_client").val(item.id);
            $("#name_client").val(item.name);
            $("#email_client").val(item.email);
            $("#age_client").val(item.age);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}