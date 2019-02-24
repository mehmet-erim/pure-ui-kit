const importer = {
  url: ( url ) => {
    return new Promise( ( resolve, reject ) => {
      let script = document.createElement( 'script' );
      script.type = 'text/javascript';
      script.src = url;
      script.addEventListener( 'load', () => resolve( script ), false );
      script.addEventListener( 'error', () => reject( script ), false );
      document.body.appendChild( script );
      importer.loaded.push( url )
    } );
  },
  urls: ( urls ) => {
    return Promise.all( urls.map( importer.url ) );
  },
  loaded: [],
  has: ( url ) => !!importer.loaded.find( u => u === url )
};

function route ( component, importJs = false ) {
  ( document.querySelectorAll( '.navigation' ) || [] ).forEach( ( element ) => {
    document.querySelector( `[href="${ element.hash }"]` ).classList.value = element.classList.value.replace( 'active', '' );
  } );

  document.querySelector( `[href="#/${ component }` ).classList.value += ' active';

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open( "GET", `./components/${ component }.html`, false );
  xmlhttp.send();
  document.querySelector( 'router-outlet' ).innerHTML = xmlhttp.responseText;

  if ( importJs ) importer.url( `assets/js/components/${ component }.js` )
}

window.addEventListener( "hashchange", ( { newURL } ) => {
  var pathIndex = newURL.indexOf( '#/' );
  if ( pathIndex > -1 ) {
    const path = newURL.substr( pathIndex + 2 );
    route( path, path === 'flash-message' )
  }
}, false );

window.addEventListener( 'load', function () {
  const { URL } = window.document;
  const pathIndex = URL.indexOf( '#/' );
  if ( pathIndex > -1 ) {
    const path = URL.substr( URL.indexOf( '#/' ) + 2 );
    route( path, path === 'flash-message' )
  }
}, false );
