import { InfraUsecase } from './usecase.js';
import { handleUnaryCall } from '@grpc/grpc-js';

type DbPing = handleUnaryCall<any, any>;
type GetSetting = handleUnaryCall<any, any>;

export const InfraHandler = {
  DbPing: (async (_call, callback) => {
    try {
      const res = await InfraUsecase.dbPing();
      callback(null, res);
    } catch (e) {
      callback(e as Error, null);
    }
  }) as DbPing,

  GetSetting: (async (call, callback) => {
    try {
      const { key } = call.request;
      const res = await InfraUsecase.getSetting(key);
      callback(null, res);
    } catch (e) {
      callback(e as Error, null);
    }
  }) as GetSetting,
};
