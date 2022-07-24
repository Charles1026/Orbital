// Depreciated

// $(document).ready(() => {
//   console.log(document.cookie.split(";"));
//   let cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i].split("=");
//     try {
//       elementReplacer(cookie[0].trim(), decodeURIComponent(cookie[1].trim()));
//     } catch (err) {
//       console.log("Cannot Set " + cookie[0].trim() + " " + err.stack)
//     }
//   }
// });

// function elementReplacer (id, text) {
//   if (id == "pos") {
//     text = text == 1 ? "Guard" : text == 2 ? "Forward" : text == 3 ? "Center" : "";
//   }

//   if (id == "exp") {
//     text = text == 1 ? "New" : text == 2 ? "Recreational" : text == 3 ? "Competitive" : text == 4 ? "Professional" : "";
//   }

//   let element = document.getElementById(id);
//   element.innerHTML = text;
// }