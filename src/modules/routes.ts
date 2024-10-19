import express, { Request, Response } from "express";
import * as usuarioService from './usuarios/usuario.service';
import * as usuarioController from './usuarios/usuario.controller';
import swaggerUi from 'swagger-ui-express';
import { ConfigSwagger } from '../infra/swagger/configSwagger';

const routes = express.Router();

routes.post('/formulario', (req: Request, res: Response) => {
    const body = req.body;
    usuarioController.validarGravacao(body, (paramValido: boolean, mensagemErro: string)=> {
        if (!paramValido) {
            res.status(422).json({
                "statusCode": 422,
                "message": mensagemErro
            });
        }
        else {
            usuarioService.gravarRespostaFormulario(body, (err: any, gravado: boolean, message: string) => {
                if (err) {
                    res.status(400).json({
                        "statusCode": 400,
                        "message": err.message
                    });
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        'gravado': gravado,
                        "message": message
                    })
                }
            })
        }
    })
});

routes.get('/formulario', (req: Request, res: Response) => {
    const { Formulario } = req.query;
    usuarioController.validarParametro(String(Formulario), (paramValido: boolean, mensagemErro: string)=> {
        if (!paramValido) {
            res.status(422).json({
                "statusCode": 422,
                "message": mensagemErro
            });
        }
        else {
            usuarioService.retornaFormulario(String(Formulario), (err: any, arquivo: string) => {
                if (err) {
                    res.status(400).json({
                        "statusCode": 400,
                        "message": err.message
                    });
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        'arquivo': arquivo,
                        "nomeArquivo": Formulario + '.csv',
                        'enconding': 'base64'
                    })
                }
            })
        }
    })
});

routes.put('/reset', (req: Request, res: Response) => {
    const { Formulario } = req.body;
    usuarioController.validarParametro(Formulario, (paramValido: boolean, mensagemErro: string)=> {
        if (!paramValido) {
            res.status(422).json({
                "statusCode": 422,
                "message": mensagemErro
            });
        }
        else {
            usuarioService.reset(Formulario, (err: any) => {
                if (err) {
                    res.status(400).json({
                        "statusCode": 400,
                        "message": err.message
                    });
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        'resetado': true,
                    })
                }
            })
        }
    })
})


// Para utilização dos testes automatizados este bloco deve estar comentado
const configSwagger = new ConfigSwagger();
routes.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(configSwagger.swaggerDocument));
// Fim do bloco que deve estar comentado para uso dos testes automatizados
routes.get('/', function (req, res) {
    res.send('Api de registro de forms');
});

export default routes;