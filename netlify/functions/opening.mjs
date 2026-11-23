// OPENING BALANCE = cumulative already in your sheet for 20 and 21 Nov.
// Added automatically when the cumulative starts on or before 20 Nov and the report date is after 21 Nov.
// Saved daily entries for 20 and 21 Nov are NOT counted again; only these numbers are used for those two days.
// To correct a number, edit it here.
const groups = {};
for (let i = 1; i <= 32; i++) groups[i] = { reel: 1, photo: 1 };

export const opening = {
  start: '2026-11-20',
  through: '2026-11-21',
  cum: {
    r1: {
      plat: {
        'INSTAGRAM': { posts: { '2 Reels Post': 4, '2 Product Catalogue Image Posts': 4, '2 Story Post': 4 }, met: [174600, 35200, 212, 1396, 348, 7000], spend: 944 },
        'FACEBOOK':  { posts: { '2 Reels Post': 4, '2 Product Catalogue Image Posts': 4, '1 Story Post': 4, '1 Post in Market Place': 4 }, met: [25600, 19200, 339, 654, 4, 345], spend: 944 },
        'YOUTUBE':   { posts: { '2 Reels Post': 4, 'Weekly 1 Long Video Post': 0, '1 Product Catalog Post': 2 }, met: [1141, 0, 0, 0, 100, 600], spend: 400 },
        'LINKED IN': { posts: { '1 Business Post': 0, '1 Reels Post': 2, '1 Product Catalog Post': 2 }, met: [84, 32, 5, 8, 1, 3], spend: 0 },
        'THREADS':   { posts: { '1 Reels Post': 2, '1 Product Catalog Post': 2 }, met: [168, 113, 0, 0, 6, 4], spend: 0 }
      },
      collab: { 'SAREE REEL': { yes: 2, no: 0, views: 9079 }, 'SAREE PHOTO': { yes: 1, no: 0, views: 58300 } }
    },
    r2: {
      groups: groups,
      leads: { 'Total leads': 92, 'Outgoing': 2, 'Incoming': 29, 'Qualified': 13, 'Disqualified': 76, 'Un Identified': 2, 'No. Of Visits': 3, 'No. of Parties Giving Order by Visit': 3, 'No. of Parties Giving Order by Phone': 2 },
      orders: { 'Visit Order': { pcs: 46, amt: 19076 }, 'Phone Order': { pcs: 0, amt: 0 } }
    }
  },
  collabLog: [
    { date: '2026-11-20', item: 'SAREE REEL', name: 'SIR', views: 7300 },
    { date: '2026-11-20', item: 'SAREE PHOTO', name: 'SRIJA BHOWMICK', views: 58300 },
    { date: '2026-11-21', item: 'SAREE REEL', name: 'SIR', views: 1779 }
  ]
};
