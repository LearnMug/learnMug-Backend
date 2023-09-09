const swaggerAutogen = require("swagger-autogen");

const  doc  =  { 
  informações : { 
    título : 'Minha API' , 
    descrição : 'Descrição' , 
  } , 
  host : 'localhost:4000' , 
  esquemas : [ 'localhost' ] , 
} ;

const  outputFile  =  './swagger_output.json' ; 
const  endpointsFiles  =  [ './src/routes.js' ] ;

swaggerAutogen ( outputFile ,  endpointsFiles ,  doc ) . then ( ( )  =>  {
  console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+ outputFile);
  require ( './index.js' ) ;  // arquivo raiz do seu projeto 
} ) ;