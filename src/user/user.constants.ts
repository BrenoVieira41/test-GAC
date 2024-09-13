const ID_ERROR_MESSAGE = 'Id inválido.';
const NAME_ERROR_MESSAGE = 'Nome inválido, esperado entre 3 a 250 caracteres.';
const BORNDATE_ERROR_MESSAGE = 'Data de nascimento inválida, esperado no mínimo 18 anos em formato 01/01/2001.';
const BORNDATE_YEAR_INVALID = 'O usuário precisa ter acima de 18 anos para se cadastrar.';
const EMAIL_ERROR_MESSAGE = 'E-mail inválido.';
const PASSWORD_ERROR_MESSAGE =
  'Senha inválida, esperado 6 caracteres, sendo eles 1 número, 1 letra maiúscula, 1 letra minúscula e 1 símbolo.';
const PASSWORD_NOT_FOUND = 'Necessário passar uma senha.';
const CODE_ERROR_MESSAGE = 'Esperado um código com 4 caracteres.';
const CODE_REPEAT_ERROR_MESSAGE = 'Os números do código não podem repetir';

const USER_NOT_FOUND = 'Usuário não encontrado.';
const LOGIN_ERROR_MESSAGE = 'E-mail e ou senha inválido(s).';
const VALUE_NOT_FOUND = 'Nenhum valor recebido.';

const CREATE_ERROR_MESSAGE = 'Falha ao criar usuário.';
const UPDATE_ERROR_MESSAGE = 'Falha ao alterar o usuário.';
const DELETE_ERROR_MESSAGE = 'Falha ao deletar o usuário.';
const GET_ERROR_MESSAGE = 'Falha ao buscar o usuário.';
const FIND_ERROR_MESSAGE = 'Falha ao listar usuários';
const LOGIN_TEMPLATE_ERROR = 'Falha ao logar.'

const UPDATE_SUCCESS_MESSAGE = 'Usuário alterado com sucesso.';
const DELETE_SUCCESS_MESSAGE = 'Usuário deletada com sucesso.';

export {
  ID_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  BORNDATE_ERROR_MESSAGE,
  BORNDATE_YEAR_INVALID,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_NOT_FOUND,
  CODE_REPEAT_ERROR_MESSAGE,
  CREATE_ERROR_MESSAGE,
  UPDATE_ERROR_MESSAGE,
  DELETE_ERROR_MESSAGE,
  GET_ERROR_MESSAGE,
  FIND_ERROR_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  USER_NOT_FOUND,
  LOGIN_ERROR_MESSAGE,
  VALUE_NOT_FOUND,
  CODE_ERROR_MESSAGE,
  LOGIN_TEMPLATE_ERROR
};
