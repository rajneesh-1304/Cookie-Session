import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionManager {
  // Key: UserId (string), Value: Set of SessionIds (strings)
  private activeSessions = new Map<string, Set<string>>();

  canLogin(userId: string): boolean {
    const sessions = this.activeSessions.get(userId);
    // Only allow if sessions are less than 2
    return !sessions || sessions.size < 2;
  }

  addSession(userId: string, sessionId: string) {
    if (!this.activeSessions.has(userId)) {
      this.activeSessions.set(userId, new Set());
    }
    this.activeSessions.get(userId).add(sessionId);
  }

  removeSession(userId: string, sessionId: string) {
    const sessions = this.activeSessions.get(userId);
    if (sessions) {
      sessions.delete(sessionId);
      if (sessions.size === 0) this.activeSessions.delete(userId);
    }
  }
}