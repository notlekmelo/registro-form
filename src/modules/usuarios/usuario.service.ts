import fs from "fs";
import path from "path";

const caminhoArquivo = path.join("C:", 'Temp')

export const gravarRespostaFormulario = (body: any, callback: Function) => {
    try {
        if (!fs.existsSync(caminhoArquivo)){
            fs.mkdirSync(caminhoArquivo);
        }
        let caminhoCompleto = path.join(caminhoArquivo, body.Formulario + '.csv')
        if (!fs.existsSync(caminhoCompleto)) {
            fs.writeFileSync(caminhoCompleto, 'Nome;Telefone;E-mail;Cidade;UF;Selecao')
        }
        fs.appendFileSync(caminhoCompleto, `\n${body.Nome};${body.Telefone};${body.Email};${body.Cidade};${body.Uf};${body.Selecao}`, {encoding: "utf8"})
        callback(null, true, 'Gravado com sucesso.')
    }
    catch(err){
        callback(err)
    }
}

export const retornaFormulario = (formulario: string, callback: Function) => {
    try {
        let caminhoCompleto = path.join(caminhoArquivo, formulario + '.csv')
        if (fs.existsSync(caminhoCompleto)) {
            const arquivo = fs.readFileSync(caminhoCompleto, 'base64');
            callback(null, arquivo)
        }
        else {
            callback({message: 'Formulário informado não encontrado'});
        }
    }
    catch(err) {
        callback(err)
    }
}

export const reset = (formulario: string, callback: Function) => {
    try {
        let caminhoCompleto = path.join(caminhoArquivo, formulario + '.csv')
        fs.writeFileSync(caminhoCompleto, 'Nome;Telefone;E-mail;Cidade;UF;Selecao')
        callback(null);
    }
    catch (err) {
        callback(err)
    }
}