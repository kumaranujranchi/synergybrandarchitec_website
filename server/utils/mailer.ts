import sgMail from '@sendgrid/mail';

// Set SendGrid API key from environment variables
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set. Email functionality will not work.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Email template for password reset
const getPasswordResetTemplate = (resetToken: string, userName: string) => {
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
  
  return {
    subject: 'Reset Your Password - Synergy Brand Architect',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="//imgur.com/8j3VafC" alt="Synergy Brand Architect Logo" style="max-width: 200px;">
        </div>
        <h2 style="color: #FF6B00; text-align: center;">Password Reset Request</h2>
        <p>Hello ${userName},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #FF6B00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 3px;"><a href="${resetLink}">${resetLink}</a></p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Synergy Brand Architect. All rights reserved.</p>
          <p>East Gola Road, Vivek Vihar Colony, Danapur Nizamat, Patna 801503</p>
        </div>
      </div>
    `,
    text: `Hello ${userName},\n\nWe received a request to reset your password. If you didn't make this request, you can ignore this email.\n\nTo reset your password, click this link: ${resetLink}\n\nThis link will expire in 1 hour for security reasons.\n\nSynergy Brand Architect Team`
  };
};

// Email template for OTP verification
const getOTPTemplate = (otp: string, userName: string) => {
  return {
    subject: 'Your Password Reset OTP - Synergy Brand Architect',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="//imgur.com/8j3VafC" alt="Synergy Brand Architect Logo" style="max-width: 200px;">
        </div>
        <h2 style="color: #FF6B00; text-align: center;">Your OTP Code</h2>
        <p>Hello ${userName},</p>
        <p>We received a request to reset your password. Use the following One-Time Password (OTP) to complete the process:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 5px;">${otp}</div>
        </div>
        <p>This code will expire in 15 minutes for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Synergy Brand Architect. All rights reserved.</p>
          <p>East Gola Road, Vivek Vihar Colony, Danapur Nizamat, Patna 801503</p>
        </div>
      </div>
    `,
    text: `Hello ${userName},\n\nWe received a request to reset your password. Use the following One-Time Password (OTP) to complete the process:\n\n${otp}\n\nThis code will expire in 15 minutes for security reasons.\n\nIf you didn't request this password reset, please ignore this email or contact our support team if you have concerns.\n\nSynergy Brand Architect Team`
  };
};

// Send password reset email with token
export const sendPasswordResetEmail = async (email: string, resetToken: string, userName: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not configured");
  }
  
  const template = getPasswordResetTemplate(resetToken, userName);
  
  const msg = {
    to: email,
    from: 'no-reply@synergybrandarchitect.in', // Adjust to your verified sender
    subject: template.subject,
    text: template.text,
    html: template.html,
  };
  
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
};

// Send OTP email
export const sendOTPEmail = async (email: string, otp: string, userName: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not configured");
  }
  
  const template = getOTPTemplate(otp, userName);
  
  const msg = {
    to: email,
    from: 'no-reply@synergybrandarchitect.in', // Adjust to your verified sender
    subject: template.subject,
    text: template.text,
    html: template.html,
  };
  
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error };
  }
};