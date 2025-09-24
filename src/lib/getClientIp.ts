import { NextRequest } from "next/server";

export function getClientIP(request: NextRequest): string {
  // En-têtes à vérifier dans l'ordre de priorité
  const headers = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "x-forwarded",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for peut contenir plusieurs IPs séparées par des virgules
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }

  // Si aucune IP n'est trouvée dans les headers, utiliser une IP par défaut
  return "unknown";
}

function isValidIP(ip: string): boolean {
  // Vérification basique pour IPv4 et IPv6
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^[0-9a-fA-F:]+$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
