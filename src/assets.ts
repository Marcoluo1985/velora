const root = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
export const splashVideo = `${root}hf_20260624_205729_0e6fae4e-5fc0-42d0-b49a-b88d85ede0b2.mp4`;
export const heroVideo = `${root}hf_20260624_210218_173f8eba-17ff-4e27-972b-d128af25bf49.mp4`;
export const images = ['hf_20260624_211418_dbb8d807-3cfb-4c26-b1df-02fb0c23cc7d.png', 'hf_20260624_211445_ba965dcd-97d6-4644-b390-d4744078ec6c.png', 'hf_20260624_212326_f5e78786-d7bb-40c5-abac-cd3c0be37d90.png'].map(file => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(root + file)}&w=1280&q=85`);
