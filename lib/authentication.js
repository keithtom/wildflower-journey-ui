// export const authenticate = ({
//     provider,
//     url,
//     tab = false,
//     cb,
//   }) => {
//     let name = tab ? '_blank' : provider;
//     openPopup(provider, url, name);
  
//     function receiveMessage(event) {
//       // Do we trust the sender of this message?  (might be
//       // different from what we originally opened, for example).
//       if (event.origin !== window.location.origin) {
//         return;
//       }
  
//       if (event.data.jwt && event.data.success) {
//         cb();
//       }
//     }
  
//     window.addEventListener('message', receiveMessage, false);
//   };

// var settings =
// 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

// function getPopupOffset({ width, height }) {
// var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
// var wTop = window.screenTop ? window.screenTop : window.screenY;

// var left = wLeft + window.innerWidth / 2 - width / 2;
// var top = wTop + window.innerHeight / 2 - height / 2;

// return { top, left };
// }

// function getPopupSize(provider) {
//     switch (provider) {
//     case 'facebook':
//         return { width: 580, height: 400 };

//     case 'google':
//         return { width: 452, height: 633 };

//     case 'github':
//         return { width: 1020, height: 618 };

//     case 'linkedin':
//         return { width: 527, height: 582 };

//     case 'twitter':
//         return { width: 495, height: 645 };

//     case 'live':
//         return { width: 500, height: 560 };

//     case 'yahoo':
//         return { width: 559, height: 519 };

//     default:
//         return { width: 1020, height: 618 };
//     }
// }

// function getPopupDimensions(provider) {
// let { width, height } = getPopupSize(provider);
// let { top, left } = getPopupOffset({ width, height });

// return `width=${width},height=${height},top=${top},left=${left}`;
// }

// // Arguments :
// //  verb : 'GET'|'POST'
// //  target : an optional opening target (a name, or "_blank"), defaults to "_self"
// window.io = {
//     open: function(verb, url, data, target){
//         var form = document.createElement("form");
//         form.action = url;
//         form.method = verb;
//         form.target = target || "_self";
//         if (data) {
//             for (var key in data) {
//                 var input = document.createElement("textarea");
//                 input.name = key;
//                 input.value = typeof data[key] === "object"
//                     ? JSON.stringify(data[key])
//                     : data[key];
//                 form.appendChild(input);
//             }
//         }
//         form.style.display = 'none';
//         document.body.appendChild(form);
//         form.submit();
//         document.body.removeChild(form);
//     }
// };

// export default function openPopup(provider, url, name) {
//     return io.open('post', url, null, name);
//     // return window.open(url, name, `${settings},${getPopupDimensions(provider)}`);
// }
