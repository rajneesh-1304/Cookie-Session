import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from './session.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PresenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      
      const userId = payload.sub;
      const sessionId = payload.sid;

      // Mark this session as active in memory
      this.sessionService.addSession(userId, sessionId);
      
      // Store on client for easy cleanup
      client.data = { userId, sessionId };
      console.log(`User ${userId} session started: ${sessionId}`);
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data) {
      const { userId, sessionId } = client.data;
      this.sessionService.removeSession(userId, sessionId);
      console.log(`User ${userId} session ended: ${sessionId}`);
    }
  }
}