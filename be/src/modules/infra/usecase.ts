import { InfraRepo } from './repo.js';
import { notFound, invalidArgument } from '../../libs/grpc-errors.js';

export const InfraUsecase = {
  async dbPing() {
    const { serverVersion, now } = await InfraRepo.ping();
    return { ok: true, serverVersion: serverVersion, now };
  },

  async getSetting(key?: string) {
    if (!key) throw invalidArgument('key is required');
    const found = await InfraRepo.getSetting(key);
    if (!found) throw notFound(`setting not found: ${key}`);
    return { key: found.key, value: found.value };
  },
};
