import { withConn } from '../../libs/db.js';
import { AppSetting } from './types.js';

export const InfraRepo = {
  async ping(): Promise<{ serverVersion: string; now: string }> {
    return withConn(async (c) => {
      const [[v]] = await c.query<any[]>('SELECT VERSION() AS v');
      const [[n]] = await c.query<any[]>('SELECT NOW() AS now');
      return { serverVersion: v.v as string, now: n.now as string };
    });
  },

  async getSetting(key: string): Promise<AppSetting | null> {
    return withConn(async (c) => {
      const [rows] = await c.query<any[]>('SELECT `key`,`value` FROM app_settings WHERE `key` = ?', [key]);
      if (rows.length === 0) return null;
      return { key: rows[0].key as string, value: rows[0].value as string };
    });
  },
};
