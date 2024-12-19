      window.onload = async function () {
		const url = "https://script.google.com/macros/s/AKfycbxpfAkWfna-pTbJGcrq80C4ZTZq4aFvVSc9U8qoQo6dRuw_UyP7nbe7L4jAuebO8jtRbA/exec";
        const response = await fetch(url+"?GET=data");
        const data = await response.json();
        const dataArray = data.Return;
        if (dataArray[0] && dataArray[0] !== undefined && dataArray[0].length != 0) {
          const result = "<table class='table table-sm table-striped table-hover' id='dataTable'></table>";
          document.getElementById("search-results").innerHTML = result;
          $(document).ready(function () {
            $("#dataTable").DataTable({
              data: dataArray[0],
              dom:"Bfrtip",
              responsive:true,
              searching:true,
              language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json",
              },
              columns: [
                {"title":"อำเภอ"},
                {"title":"ชื่อ"},
                {"title":"รหัส 9 หลัก"},
              ],
            });
            
            pdfMake.fonts = {
              Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
              }
            }
          });
        }
        else {
          document.getElementById("search-results").innerHTML = "ERROR ๔๐๔ !!!!";
        }
		if (dataArray[1] && dataArray[1] !== undefined && dataArray[1].length != 0) {
          const result = "<table class='table table-sm table-striped table-hover' id='passwordTable'></table>";
          document.getElementById("password-results").innerHTML = result
          $(document).ready(function () {
            $("#passwordTable").DataTable({
              data: dataArray[1],
              dom:"Bfrtip",
              responsive:true,
              searching:true,
              language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json",
              },
              columns: [
                {"title":"ชื่อหน่วยงาน"},
                {"title":"User/Password"},
              ],
            })
            
            pdfMake.fonts = {
              Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
              }
            }
          })
        }
        else {
          document.getElementById("password-results").innerHTML = "ERROR ๔๐๔ !!!!"
        }
		document.forms["searchForm"].onsubmit = async function (e) {
			e.preventDefault();

			const header = document.getElementById("header");
			const footer = document.getElementById("footer");
			const alert = document.getElementById("alert");
			const changeGC = document.getElementById("changeGC");
			const searchGCH = document.getElementById("searchGCH");
			const searchGCShH = document.getElementById("searchGCShH");

			header.style.display = "none";
			footer.style.display = "inline";
			alert.style.display = "inline";

			if (changeGC.value == "0") {
			  Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'กรุณาเลือกประเภทของหน่วยงาน!!',
				showConfirmButton: false,
				allowOutsideClick: false,
				timer: 3000,
			  });

			  header.style.display = "inline";
			  footer.style.display = "none";
			  alert.style.display = "none";
			}

			else {
			  header.style.display = "inline";
			  footer.style.display = "none";
			  alert.style.display = "none";

			  if (changeGC.value == "GCH") {

				if (!searchGCH.value) {
				  header.style.display = "none";
				  footer.style.display = "inline";
				  alert.style.display = "inline";

				  Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'กรุณาพิมพ์ชื่อโรงพยาบาล!!',
					showConfirmButton: false,
					allowOutsideClick: false,
					timer: 3000,
				  });

				  header.style.display = "inline";
				  footer.style.display = "none";
				  alert.style.display = "none";
				}

				else {
				  header.style.display = "none";
				  footer.style.display = "inline";
				  alert.style.display = "inline";

				  Swal.fire({
					title: 'รอสักครู่!!!',
					timerProgressBar: true,
					allowOutsideClick: false,
					didOpen: function () {
					  Swal.showLoading()
					},
				  });
				  
				  const searchForm = document.forms["searchForm"];
				  const formData = new FormData(searchForm);
				  const url = "https://script.google.com/macros/s/AKfycbxpfAkWfna-pTbJGcrq80C4ZTZq4aFvVSc9U8qoQo6dRuw_UyP7nbe7L4jAuebO8jtRbA/exec";
				  const send = await fetch(url, {method: "POST", body: formData});
				  const data = await send.json();
				  const dataArray = data.Return;

				  if (dataArray && dataArray !== undefined && dataArray.length != 0) {
					header.style.display = "inline";
					let result = "<table class='table table-sm table-striped table-hover' id='tableGCH'>"+
					  "<thead style='white-space: nowrap'>"+
						"<tr>"+
						"<th scope='col'>รายชื่อ</th>"+
						"<th scope='col'>ชื่อ</th>"+
						"<th scope='col'>อำเภอ</th>"+
						"<th scope='col'>วันที่รับรอง</th>"+
						"<th scope='col'>วันหมดอายุ</th>"+
						"<th scope='col'>ระดับ</th>"+
						"<th scope='col'>ด้านท้าทาย</th>"+
						"</tr>"+
					  "</thead>"
					for (let i = 0; i < dataArray.length; i++) {
					  result += "<tr>";
					  for (let j = 0; j < dataArray[i].length; j++) {
						result += "<td class=\"table table-striped table-hover\">"+dataArray[i][j]+"</td>";
					  };
					  result += "</tr>";
					};
					result += "</table>";

					Swal.fire({
					  position: 'center',
					  icon: 'success',
					  title: 'ผลการค้นหา',
					  html: ''+result+'',
					  confirmButtonText:'<box-icon name="smile" animation="tada"></box-icon>&nbsp; ปิดหน้าต่าง',
					  timerProgressBar: true,
					  allowOutsideClick: false,
					  timer: 60000,
					});

					$(document).ready(function () {
					  pdfMake.fonts = {
						Roboto: {
						  normal: "Roboto-Regular.ttf",
						  bold: "Roboto-Medium.ttf",
						  italics: "Roboto-Italic.ttf",
						  bolditalics: "Roboto-MediumItalic.ttf"
						}
					  }

					  $("#tableGCH").DataTable({
						data: dataArray,                  
						dom:"Bfrtip",
						responsive:true,
						searching:false,
						language: {
						  url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json",
						},
						columns: [
						  {"title":"รายชื่อ"},
						  {"title":"ชื่อ"},
						  {"title":"อำเภอ"},
						  {"title":"วันที่รับรอง"},
						  {"title":"วันหมดอายุ"},
						  {"title":"ระดับ"},
						  {"title":"ด้านท้าทาย"},
						],
						columnDefs: [
						  {
							targets: [1,2],
							visible: false,
						  }
						]
					  })
					});

					footer.style.display = "none";
					alert.style.display = "none";
					searchGCH.value = "";
				  }

				  else {
					header.style.display = "inline";

					Swal.fire({
					  position: 'center',
					  icon: 'error',
					  title: 'ผลการค้นหา',
					  html: 'ไม่พบข้อมูล',
					  confirmButtonText:'<box-icon name="sad" animation="tada"></box-icon>&nbsp; ปิดหน้าต่าง',
					  timerProgressBar: true,
					  allowOutsideClick: false,
					  timer: 60000,
					});

					footer.style.display = "none";
					alertInfo.style.display = "none";
					searchGCH.value = "";
				  }
				}
			  }

			  else if (changeGC.value == "GCShH") {

				if (!searchGCShH.value) {
				  header.style.display = "none";
				  footer.style.display = "inline";
				  alert.style.display = "inline";

				  Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'กรุณาพิมพ์พิมพ์รหัสสถานบริการ 9 หลักของโรงพยาบาลส่งเสริมสุขภาพตำบล!!',
					showConfirmButton: false,
					allowOutsideClick: false,
					timer: 3000,
				  });

				  header.style.display = "inline";
				  footer.style.display = "none";
				  alert.style.display = "none";
				}

				else {
				  header.style.display = "none";
				  footer.style.display = "inline";
				  alert.style.display = "inline";

				  Swal.fire({
					title: 'รอสักครู่!!!',
					timerProgressBar: true,
					allowOutsideClick: false,
					didOpen: function () {
					  Swal.showLoading()
					  },
				  });
				  
				  const searchForm = document.forms["searchForm"];
				  const formData = new FormData(searchForm);
				  const url = "https://script.google.com/macros/s/AKfycbxpfAkWfna-pTbJGcrq80C4ZTZq4aFvVSc9U8qoQo6dRuw_UyP7nbe7L4jAuebO8jtRbA/exec";
				  const send = await fetch(url, {method: "POST", body: formData});
				  const data = await send.json();
				  const dataArray = data.Return;

				  if (dataArray && dataArray !== undefined && dataArray.length != 0) {
					header.style.display = "inline";
					let result = "<table class='table table-sm table-striped table-hover' id='tableGCShH'>"+
					  "<thead style='white-space: nowrap'>"+
						"<tr>"+
						"<th scope='col'>รหัสหน่วยงานบริการสุขภาพ</th>"+
						"<th scope='col'>รายชื่อ</th>"+
						"<th scope='col'>วันที่รับรอง</th>"+
						"<th scope='col'>วันหมดอายุ</th>"+
						"<th scope='col'>ระดับ</th>"+
						"</tr>"+
					  "</thead>"
					for (let i = 0; i < dataArray.length; i++) {
					  result += "<tr>";
					  for (let j = 0; j < dataArray[i].length; j++) {
						result += "<td class=\"table table-striped table-hover\">"+dataArray[i][j]+"</td>";
					  };
					  result += "</tr>";
					};
					result += "</table>";

					Swal.fire({
					  position: 'center',
					  icon: 'success',
					  title: 'ผลการค้นหา',
					  html: ''+result+'',
					  confirmButtonText:'<box-icon name="smile" animation="tada"></box-icon>&nbsp; ปิดหน้าต่าง',
					  timerProgressBar: true,
					  allowOutsideClick: false,
					  timer: 60000,
					});

					$(document).ready(function () {
					  pdfMake.fonts = {
						Roboto: {
						  normal: "Roboto-Regular.ttf",
						  bold: "Roboto-Medium.ttf",
						  italics: "Roboto-Italic.ttf",
						  bolditalics: "Roboto-MediumItalic.ttf"
						}
					  }

					  $("#tableGCShH").DataTable({
						data: dataArray,                  
						dom:"Bfrtip",
						responsive:true,
						searching:false,
						language: {
						  url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json",
						},
						columns: [
						  {"title":"รหัสหน่วยงานบริการสุขภาพ"},
						  {"title":"รายชื่อ"},
						  {"title":"วันที่รับรอง"},
						  {"title":"วันหมดอายุ"},
						  {"title":"ระดับ"},
						],
						columnDefs: [
						  {
							targets: [0],
							visible: false,
						  }
						]
					  })
					});
					footer.style.display = "none";
					alert.style.display = "none";
					searchGCShH.value = "";
				  }
				  
				  else {
					header.style.display = "inline";

					Swal.fire({
					  position: 'center',
					  icon: 'error',
					  title: 'ผลการค้นหา',
					  html: 'ไม่พบข้อมูล',
					  confirmButtonText:'<box-icon name="sad" animation="tada"></box-icon>&nbsp; ปิดหน้าต่าง',
					  timerProgressBar: true,
					  allowOutsideClick: false,
					  timer: 60000,
					});

					footer.style.display = "none";
					alertInfo.style.display = "none";
					searchGCShH.value = "";
				  }
				}
			  }
			}
		  }
      })
      
      function search(value) {
        if (value == "0") {
          document.getElementById("GCH").style.display = "none";
          document.getElementById("GCShH").style.display = "none";
          document.getElementById("searchGCH").value = "";
          document.getElementById("searchGCShH").value = "";
        }

        else if (value == "GCH") {
          document.getElementById("GCH").style.display = "inline";
          document.getElementById("GCShH").style.display = "none";
          document.getElementById("searchGCShH").value = "";
        }

        else if (value == "GCShH") {
          document.getElementById("GCH").style.display = "none";
          document.getElementById("GCShH").style.display = "inline";
          document.getElementById("searchGCH").value = "";
        }

        else {
          console.error("Error!!!");
          document.getElementById("GCH").style.display = "none";
          document.getElementById("GCShH").style.display = "none";
          document.getElementById("searchGCH").value = "";
          document.getElementById("searchGCShH").value = "";
        }
      }