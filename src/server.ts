import Hapi from '@hapi/hapi';
import statusPlugin from './plugins/status';
import prismaPlugin from './plugins/prisma';
import usersPlugin from './plugins/users';

const server: Hapi.Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
});


export async function createServer(): Promise<Hapi.Server> {
    await server.register([statusPlugin, prismaPlugin, usersPlugin]);
    await server.initialize();
    return server;
};

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});