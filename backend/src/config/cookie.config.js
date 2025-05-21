


export const cookieOptions = {
  httpOnly: true,                         // Prevent client-side JS access
  secure: process.env.ENV === 'production', // Use HTTPS in production
  sameSite: process.env.ENV === 'production' ? 'None' : 'Lax', // Allow cross-site only in production if needed
  maxAge: 1000 * 60 * 60,                 // 1 hour
};
