const root = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
export const splashVideo = `${root}hf_20260624_205729_0e6fae4e-5fc0-42d0-b49a-b88d85ede0b2.mp4`;
export const heroVideo = '/media/home-7-30.mp4';
export const images = ['/media/gallery-1.png', '/media/gallery-2.png', 'hf_20260624_212326_f5e78786-d7bb-40c5-abac-cd3c0be37d90.png'].map(file => file.startsWith('/') ? file : `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(root + file)}&w=1280&q=85`);
