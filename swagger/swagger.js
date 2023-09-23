const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR',
});

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
  if(process.env.NODE_ENV !== 'production'){
    require ( '../index.js' ) ;  // arquivo raiz do seu projeto 
  }
} ) ;