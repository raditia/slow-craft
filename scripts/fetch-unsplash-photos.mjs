/**
 * Fetch your Unsplash photos and output Ghost-ready image URLs.
 *
 * Setup:
 *   1. Get a free API key at https://unsplash.com/developers
 *   2. Run: ACCESS_KEY=your_key USERNAME=your_username node scripts/fetch-unsplash-photos.mjs
 *
 * Optional flags:
 *   PER_PAGE=30   number of photos to fetch (max 30 per request)
 *   ORDER_BY=latest|oldest|popular
 */

const ACCESS_KEY = process.env.ACCESS_KEY;
const USERNAME   = process.env.USERNAME;
const PER_PAGE   = process.env.PER_PAGE   || 30;
const ORDER_BY   = process.env.ORDER_BY   || 'latest';

if (!ACCESS_KEY || !USERNAME) {
    console.error('Missing ACCESS_KEY or USERNAME.\n');
    console.error('Usage: ACCESS_KEY=xxx USERNAME=yyy node scripts/fetch-unsplash-photos.mjs');
    process.exit(1);
}

const url = `https://api.unsplash.com/users/${USERNAME}/photos?per_page=${PER_PAGE}&order_by=${ORDER_BY}&client_id=${ACCESS_KEY}&content_filter=low`;

const res = await fetch(url);

if (!res.ok) {
    const body = await res.text();
    console.error(`Unsplash API error ${res.status}: ${body}`);
    process.exit(1);
}

const photos = await res.json();

if (!photos.length) {
    console.log('No photos found for this user.');
    process.exit(0);
}

console.log(`\nFetched ${photos.length} photos for @${USERNAME}\n`);
console.log('='.repeat(60));
console.log('Paste these URLs into Ghost editor → Image block → "Insert from URL"');
console.log('Or use the Gallery block and insert them one by one.');
console.log('='.repeat(60));
console.log('');

photos.forEach((photo, i) => {
    const imageUrl = photo.urls.regular;
    const altText  = photo.alt_description || photo.description || `Photo ${i + 1}`;
    console.log(`[${i + 1}] ${altText}`);
    console.log(`    ${imageUrl}`);
    console.log(`    Unsplash page: https://unsplash.com/photos/${photo.id}`);
    console.log('');
});

console.log('='.repeat(60));
console.log('URLs only (copy-paste into Ghost image blocks):');
console.log('');
photos.forEach(photo => {
    console.log(photo.urls.regular);
});
