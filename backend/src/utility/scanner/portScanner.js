import net from 'net';

export const scanOpenPorts = async (url) => {
  const host = new URL(url).hostname;
  const portsToCheck = [21, 22, 23, 25, 80, 110, 143, 443, 3306, 8080];
  const openPorts = [];

  const checkPort = (port) =>
    new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(1000);
      socket.once('connect', () => {
        openPorts.push(port);
        socket.destroy();
        resolve();
      });
      socket.once('timeout', () => {
        socket.destroy();
        resolve();
      });
      socket.once('error', () => {
        resolve();
      });
      socket.connect(port, host);
    });

  await Promise.all(portsToCheck.map(checkPort));
  return { found: openPorts.length > 0, openPorts };
};
