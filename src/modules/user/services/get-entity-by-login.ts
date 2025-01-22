import * as dal from '../dal'

export async function getEntityByLogin(params: { login: string }) {
  return await dal.getOneByLogin(params)
}
