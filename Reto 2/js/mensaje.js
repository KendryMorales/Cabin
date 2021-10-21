$(document).ready(function () {
    traerMessage();
});

function traerMessage(){
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            mostrarMessage(respuesta.items)
        }
    });
}

function mostrarMessage(){
    $.ajax({
        dataType: 'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:'GET',
        
        success:function(respuesta) {
            let item=respuesta.items;
            for(i=0;i<item.length;i++){
                $("#resultadoMessage").append("<tbody>");
                $("#resultadoMessage").append("<tr>");
                $("#resultadoMessage").append("<td>"+item[i].id+"</td>");
                $("#resultadoMessage").append("<td>"+item[i].messagetext+"</td>");
                $("#resultadoMessage").append('<td><a class="btnO" onclick="obtenerMessageEspecifico('+item[i].id+')">Detalle</a></td>');
                $("#resultadoMessage").append('<td><button class="btnB" title="Borrar"onclick="borrarMessage('+item[i].id+')">&#10007</button></td>');
                $("#resultadoMessage").append("</tr>");
                $("#resultadoMessage").append("</tbody>");
            }
        },        
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function guardarMessage(){
    let myData={
        id:$("#id_message").val(),
        messagetext:$("#text_message").val()
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            $("#id_message").val("");
            $("#text_message").val("");
            traerMessage();
            alert("¡Se ha registrado la informacion!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function editarMessage(){     
    let myData={         
        id:$("#id_message").val(),
        messagetext:$("#text_message").val()
    };     
    console.log(myData);     
    let dataToSend=JSON.stringify(myData);     
    $.ajax({         
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",         
        data:dataToSend,         
        contentType:"application/JSON",         
        datatype:"JSON",         
        success:function(respuesta){  
            $("#resultadoMessage").empty();
            $("#id_message").val("");
            $("#text_message").val("");
            traerMessage();          
            alert("¡Se ha actualizado el registro!");
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }   
    }); 
}

function borrarMessage(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMessage").empty();
            traerMessage(); 
            alert("¡Se ha borrado el registro!")
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function obtenerMessageEspecifico(id_message){
    $.ajax({
        dataType:'json',
        url: "https://g891c341b7d4051-dbciclo3.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message/"+id_message,
        type:'GET',
        success:function(response) {
            console.log(response);
            let item=response.items[0];
            $("#id_message").val(item.id);
            $("#text_message").val(item.messagetext);
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}