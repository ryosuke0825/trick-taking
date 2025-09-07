import 'dotenv/config.js';
import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'node:path';
import { InfraHandler } from './modules/infra/handler.js';

const PROTO_PATH = path.resolve('proto/infra.proto');
const packageDef = loadSync(PROTO_PATH, {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObj = loadPackageDefinition(packageDef) as any;
const InfraService = grpcObj.hearts.infra.v1.InfraService;

const port = process.env.GRPC_PORT ?? '50051';

function main() {
  const server = new Server();
  server.addService(InfraService.service, InfraHandler);
  server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err, boundPort) => {
    if (err) {
      console.error('gRPC bind error:', err);
      process.exit(1);
    }
    console.log(`gRPC server listening on :${boundPort}`);
  });
}

main();
