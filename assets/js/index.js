const importer = {
  url: ( url ) => {
    return new Promise( ( resolve, reject ) => {
      let script = document.createElement( 'script' );
      script.type = 'text/javascript';
      script.src = url;
      script.addEventListener( 'load', () => resolve( script ), false );
      script.addEventListener( 'error', () => reject( script ), false );
      document.body.appendChild( script );
    } );
  },
  urls: ( urls ) => {
    return Promise.all( urls.map( importer.url ) );
  }
};

function route ( component, importJs = false ) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open( "GET", `./components/${ component }.html`, false );
  xmlhttp.send();
  document.querySelector( 'router-outlet' ).innerHTML = xmlhttp.responseText;

  if ( importJs ) importer.url( `assets/js/components/${ component }.js` )
}

window.addEventListener( "hashchange", ( { newURL } ) => {
  const path = newURL.substr( newURL.indexOf( '#/' ) + 2 );
  route( path, path === 'flash-message' )
}, false );

window.addEventListener( 'load', function () {
  const { URL } = window.document;
  const path = URL.substr( URL.indexOf( '#/' ) + 2 );
  route( path, path === 'flash-message' )
}, false );
