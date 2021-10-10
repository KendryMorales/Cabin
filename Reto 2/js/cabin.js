$(document).ready(function () {
    traerCabin();
});


function traerCabin(){
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            // $("#actualizarCabin").attr('disabled','disabled');
            mostrarCabin(respuesta.items)
        }
    });
}


function mostrarCabin(){
    $.ajax({
        dataType: 'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:'GET',        
        success:function(respuesta) {
            let item=respuesta.items;
            for(i=0;i<item.length;i++){
                $("#resultado").append("<tbody>");
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>"+item[i].id+"</td>");
                $("#resultado").append("<td>"+item[i].brand+"</td>");
                $("#resultado").append("<td>"+item[i].rooms+"</td>");
                $("#resultado").append("<td>"+item[i].category_id+"</td>");
                $("#resultado").append("<td>"+item[i].name+"</td>");
                $("#resultado").append('<td><a class="btnO" onclick="obtenerCabinEspecifica('+item[i].id+')">Editar</a></td>');
                $("#resultado").append('<td><button class="btnB" title="Borrar" onclick="borrarCabin('+item[i].id+')">&#10007</button></td>');
                $("#resultado").append("</tr>");
                $("#resultado").append("</tbody>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function guardarCabin(){
    let myData = {
        id:$("#id").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            traerCabin();
            alert("¡Se ha registrado la informacion!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function editarCabin(){     
    let myData={         
        id:$("#id").val(),         
        brand:$("#brand").val(),         
        rooms:$("#rooms").val(),         
        category_id:$("#category_id").val(),         
        name:$("#name").val()    
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"PUT",         
        data:dataToSend,         
        contentType:"application/JSON",         
        datatype:"JSON",         
        success:function(respuesta){             
            $("#resultado").empty();             
            $("#id").val("");             
            $("#brand").val("");             
            $("#rooms").val("");             
            $("#category_id").val("");             
            $("#name").val("");             
            traerCabin();
            // $("#id").removeAttr('disabled');             
            alert("¡Se ha actualizado el registro!")         
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    }); 
}

function borrarCabin(idElemento){
    let myData={
        id: idElemento 
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerCabin(); 
            alert("¡Se ha borrado el registro!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }  
    });
}

function obtenerCabinEspecifica(id){
    // $("#actualizarCabin").removeAttr('disabled');             
    // $("#id").attr('disabled','disabled');

    $.ajax({
        dataType: 'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin/"+id,
        type:'GET',
        success:function(respuesta) {
            console.log(respuesta);
            let item=respuesta.items[0];
            $("#id").val(item.id);
            $("#brand").val(item.brand);
            $("#rooms").val(item.rooms);
            $("#category_id").val(item.category_id);
            $("#name").val(item.name);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}