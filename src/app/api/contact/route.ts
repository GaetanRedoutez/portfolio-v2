import { getClientIP } from "@/lib/getClientIp";
import { contactRateLimiter } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  console.log("POST /api/contact");
  try {
    const clientIP = getClientIP(request);

    if (!contactRateLimiter.isAllowed(clientIP)) {
      const remainingTime = contactRateLimiter.getRemainingTime(clientIP);
      console.log(`Rate limit dépassé pour IP: ${clientIP}`);
      return NextResponse.json(
        {
          error: `Trop de tentatives. Réessayez dans ${remainingTime} secondes.`,
        },
        { status: 429 }
      );
    }

    const { firstName, lastName, email, phone, message } = await request.json();

    if (!firstName || !lastName || !email || !message) {
      console.log("Erreur: Champs manquants");
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi,
      /\b(viagra|casino|lottery|winner|congratulations|click here|act now)\b/gi,
      /(.)\1{10,}/g,
    ];

    const fullText = `${firstName} ${lastName} ${email} ${message}`;
    const hasSuspiciousContent = suspiciousPatterns.some((pattern) =>
      pattern.test(fullText)
    );

    if (hasSuspiciousContent) {
      console.log("Contenu suspect détecté");
      return NextResponse.json(
        { error: "Message rejeté pour contenu suspect" },
        { status: 400 }
      );
    }

    // Vérification de longueur raisonnable
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Le message est trop long (max 2000 caractères)" },
        { status: 400 }
      );
    }

    // Vérification email valide (format basique)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Vérification des variables d'environnement
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.EMAIL_TO
    ) {
      console.error("Erreur: Variables d'environnement manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nouveau message de contact de ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
            <p><strong>Email :</strong> ${email}</p>
            ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
            <p><strong>Message :</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    const confirmationMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation de réception - Gaëtan Redoutez",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">Merci pour votre message !</h2>
          <p>Bonjour ${firstName} ${lastName},</p>
          <p>J'ai bien reçu votre message et je vous recontacterai dans les plus brefs délais.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Récapitulatif de votre message :</strong></p>
            <p>${message}</p>
          </div>
          <p>À bientôt !</p>
          <p style="color: #666; font-size: 12px;">
            Gaëtan Redoutez - Développeur Web 
          </p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMail);

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée" }, { status: 405 });
}
