function route ( component ) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open( "GET", `./components/${ component }.html`, false );
  xmlhttp.send();
  document.querySelector( 'router-outlet' ).innerHTML = xmlhttp.responseText;
}

window.addEventListener( "hashchange", ( { newURL } ) => {
  route( newURL.substr( newURL.indexOf( '#/' ) + 2 ) )
}, false );

window.addEventListener( 'load', function () {
  const { URL } = window.document;
  route( URL.substr( URL.indexOf( '#/' ) + 2 ) )
}, false );
