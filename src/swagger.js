const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST Disruptive Technical Test',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
    },
    apis: ['src/routes/categoryRoutes.ts', 'src/routes/contentRoutes.ts', 'src/routes/userRoutes.ts'], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = {
    setupSwagger
};