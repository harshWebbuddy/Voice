import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, firstName: string) {
    try {
      this.logger.log(`Sending welcome email to ${email}`);
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to VoiceAI!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed; text-align: center;">Welcome to VoiceAI, ${firstName}!</h1>
            <p>Thank you for joining VoiceAI. We're excited to have you on board!</p>
            <p>Start exploring our features and let us know if you need any help.</p>
          </div>
        `,
      });
      this.logger.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}:`, error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    try {
      this.logger.log(`Sending password reset email to ${email}`);
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Your Password - VoiceAI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed; text-align: center;">Password Reset Request</h1>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:8080/reset-password?token=${resetToken}" 
                style="background: linear-gradient(to right, #7c3aed, #06b6d4);
                       color: white;
                       padding: 12px 24px;
                       text-decoration: none;
                       border-radius: 8px;
                       display: inline-block;
                       font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #7c3aed;">
              http://localhost:8080/reset-password?token=${resetToken}
            </p>
            <p style="color: #666; margin-top: 30px;">
              If you didn't request this, please ignore this email.<br>
              This link will expire in 1 hour.
            </p>
          </div>
        `,
      });
      this.logger.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}:`, error);
      throw error;
    }
  }

  async sendPasswordChangedEmail(email: string) {
    try {
      this.logger.log(`Sending password changed email to ${email}`);
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Changed Successfully - VoiceAI',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed; text-align: center;">Password Changed Successfully</h1>
            <p>Your password has been changed successfully.</p>
            <p style="color: #ef4444; font-weight: bold;">If you didn't make this change, please contact our support team immediately.</p>
          </div>
        `,
      });
      this.logger.log(`Password changed email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password changed email to ${email}:`, error);
      throw error;
    }
  }
} 