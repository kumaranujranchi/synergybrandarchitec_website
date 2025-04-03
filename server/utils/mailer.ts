import sgMail from '@sendgrid/mail';
import { log } from '../vite';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  log('SendGrid API key not found. Email functionality will not work.', 'mailer');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  if (!process.env.SENDGRID_API_KEY) {
    log('Cannot send email: SendGrid API key not configured', 'mailer');
    return false;
  }

  try {
    const msg = {
      to: options.to,
      from: 'info@synergybrandarchitect.in', // Use your verified sender
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await sgMail.send(msg);
    log(`Email sent to ${options.to}`, 'mailer');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Helper function to create password reset email
export const sendPasswordResetEmail = async (
  email: string, 
  resetToken: string,
  resetLink: string
): Promise<boolean> => {
  const subject = 'Password Reset - Synergy Brand Architect';
  
  const text = `
    Dear User,
    
    You have requested to reset your password for your Synergy Brand Architect account.
    
    Please use the following link to reset your password:
    ${resetLink}
    
    This link will expire in 60 minutes.
    
    If you did not request a password reset, please ignore this email.
    
    Best regards,
    The Synergy Brand Architect Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.imgur.com/8j3VafC.png" alt="Synergy Brand Architect Logo" style="max-width: 200px;">
      </div>
      <h2 style="color: #0066CC; text-align: center;">Password Reset</h2>
      <p>Dear User,</p>
      <p>You have requested to reset your password for your Synergy Brand Architect account.</p>
      <p>Please click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #FF6B00; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      <p>Or copy and paste this link into your browser:</p>
      <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">${resetLink}</p>
      <p>This link will expire in 60 minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #777; font-size: 12px;">
        <p>Best regards,<br>The Synergy Brand Architect Team</p>
        <p>&copy; ${new Date().getFullYear()} Synergy Brand Architect. All rights reserved.</p>
      </div>
    </div>
  `;
  
  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

// Helper function to create OTP email
export const sendOTPEmail = async (
  email: string, 
  otp: string
): Promise<boolean> => {
  const subject = 'Password Reset OTP - Synergy Brand Architect';
  
  const text = `
    Dear User,
    
    You have requested to reset your password for your Synergy Brand Architect account.
    
    Please use the following OTP to reset your password:
    ${otp}
    
    This OTP will expire in 10 minutes.
    
    If you did not request a password reset, please ignore this email.
    
    Best regards,
    The Synergy Brand Architect Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.imgur.com/8j3VafC.png" alt="Synergy Brand Architect Logo" style="max-width: 200px;">
      </div>
      <h2 style="color: #0066CC; text-align: center;">Password Reset OTP</h2>
      <p>Dear User,</p>
      <p>You have requested to reset your password for your Synergy Brand Architect account.</p>
      <p>Please use the following One-Time Password (OTP) to complete the password reset:</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 5px;">${otp}</div>
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #777; font-size: 12px;">
        <p>Best regards,<br>The Synergy Brand Architect Team</p>
        <p>&copy; ${new Date().getFullYear()} Synergy Brand Architect. All rights reserved.</p>
      </div>
    </div>
  `;
  
  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};