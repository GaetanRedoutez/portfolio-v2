// lib/rateLimiter.ts
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 3, windowMs: number = 60000) {
    // 3 requêtes par minute
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Première requête ou fenêtre expirée
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false; // Limite dépassée
    }

    // Incrémenter le compteur
    entry.count++;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry) return 0;

    const remaining = entry.resetTime - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000)); // en secondes
  }

  // Nettoyage périodique (optionnel)
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

export const contactRateLimiter = new RateLimiter(3, 300000); // 3 requêtes toutes les 5 minutes
