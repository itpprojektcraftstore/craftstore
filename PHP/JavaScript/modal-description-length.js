function setlength() {  

  /* get length of description field --> length/250 --> html(max length 250)*/
  var l = document.getElementById("tb_description_register").value.length;
  document.getElementById("descr_length").innerHTML = l+"/250";
}