import { JwtService } from "@nestjs/jwt";
import { SessionManager } from "./session.manager";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private sessionManager: SessionManager
  ) {}

  handleConnection(client: any) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      
      const userId = payload.sub;
      const sessionId = payload.sid;

      this.sessionManager.addSession(userId, sessionId);
      
      client.userData = { userId, sessionId };
      console.log(`User ${userId} session ${sessionId} is now active.`);
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    if (client.userData) {
      const { userId, sessionId } = client.userData;
      this.sessionManager.removeSession(userId, sessionId);
      console.log(`Session ${sessionId} cleared. Slot available.`);
    }
  }
}