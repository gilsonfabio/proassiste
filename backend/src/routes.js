const crypto = require('crypto');
const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');

const AdminController = require('./controllers/AdminController');
const ModulosController = require('./controllers/ModulosController');
const CidadesController = require('./controllers/CidadesController');
const BairrosController = require('./controllers/BairrosController');
const EstadosController = require('./controllers/EstadosController');
const GruposController = require('./controllers/GruposController');
const NewsController = require('./controllers/NewsController');
const ServicesController = require('./controllers/ServicesController');
const TiposController = require('./controllers/TiposController');
const EspecializacoesController = require('./controllers/EspecializacoesController');
const SolicitacoesController = require('./controllers/SolicitacoesController');
const ContatosController = require('./controllers/ContatosController');
const OportunidadesController = require('./controllers/OportunidadesController');

routes.get('/', (request, response) => {
    response.json({
        message: 'Bem-vindo ao servidor Assiste!',
    });
});

function verifyJWT(req, res, next){
    //console.log('verificando token...')
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET_JWT, (err, userInfo) => {
        if (err) {
           return res.status(403).send({ auth: false, message: 'Token invalid!' });
        }                
        next();            
    });
}

async function verifyRefreshJWT(req, res, next){
    //console.log('verificando refresh token...')
    const refreshTokenJWT = req.headers["x-access-token"];
    if (!refreshTokenJWT) return res.status(401).send({ auth: false, message: 'No refresh token provided.' });
    
    jwt.verify(refreshTokenJWT, process.env.SECRET_JWT_REFRESH, (err, userInfo) => {
        if (err) {
           return res.status(403).send({ auth: false, message: 'Refresh Token invalid!' });
        }
        next();            
    });
}

routes.post('/refreshToken', verifyRefreshJWT, AdminController.refreshToken);
routes.post('/signIn', AdminController.signIn);

routes.get('/users', verifyJWT, AdminController.index);
routes.post('/newuser', verifyJWT, AdminController.create);
routes.put('/solPassword/:email', AdminController.solPassword);
routes.put('/updUsuario/:idAdm', verifyJWT, AdminController.updUsuario);

routes.get('/services', ServicesController.index);

routes.get('/tipos', TiposController.index);

routes.get('/especializacoes', EspecializacoesController.index);

routes.post('/signInCon', ContatosController.signIn);

routes.get('/solContato/:idCon', SolicitacoesController.solContato);
routes.post('/newSolicitacao', SolicitacoesController.newSolicitacao);

routes.get('/oprtunidades/:tipo', OportunidadesController.oportunidades);
routes.post('/newOportunidade', OportunidadesController.newOportunidade);

routes.get('/modulos', verifyJWT, ModulosController.index);
routes.get('/iteModulos/:idMod', ModulosController.iteModulos);

routes.get('/cidades', verifyJWT, CidadesController.index);
routes.post('/newCidade', verifyJWT, CidadesController.create);
routes.put('/updCidade/:idCid', verifyJWT, CidadesController.updCidade);

routes.get('/estados', verifyJWT, EstadosController.index);
routes.post('/newEstado', verifyJWT, EstadosController.create);
routes.put('/updEstado/:idEst', verifyJWT, EstadosController.updEstado);

routes.get('/bairros', verifyJWT, BairrosController.index);
routes.post('/newBairro', verifyJWT, BairrosController.create);
routes.put('/updBairro/:idBai', verifyJWT, BairrosController.updBairro);

routes.get('/grupos', verifyJWT, GruposController.index);
routes.post('/newGrupo', verifyJWT, GruposController.create);
routes.put('/updGrupo/:idGrp', verifyJWT, GruposController.updGrupo);

routes.get('/news', NewsController.index);

module.exports = routes;
