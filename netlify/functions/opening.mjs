// OPENING BALANCE = cumulative already in your sheet for 20 and 21 Nov.
// Added automatically when the cumulative starts on or before 20 Nov and the report date is after 21 Nov.
// To correct a number, edit it here.
const groups = {};
for (let i = 1; i <= 32; i++) groups[i] = { reel: 1, photo: 1 };

export const opening = {
  start: '2026-11-20',
  through: '2026-11-21',
  cum: {
    r1: {
      plat: {
        'INSTAGRAM': { posts: { '2 Reels Post': 2, '2 Product Catalogue Image Posts': 2, '2 Story Post': 2 }, met: [196800, 41400, 346, 792, 496, 4400], spend: 472 },
        'FACEBOOK':  { posts: { '2 Reels Post': 2, '2 Product Catalogue Image Posts': 2, '1 Story Post': 2, '1 Post in Market Place': 0 }, met: [32600, 24400, 408, 654, 4, 154], spend: 472 },
        'YOUTUBE':   { posts: { '2 Reels Post': 2, 'Weekly 1 Long Video Post': 0, '1 Product Catalog Post': 1 }, met: [882, 0, 0, 0, 200, 0], spend: 200 },
        'LINKED IN': { posts: { '1 Business Post': 0, '1 Reels Post': 1, '1 Product Catalog Post': 1 }, met: [104, 32, 10, 8, 0, 0], spend: 0 },
        'THREADS':   { posts: { '1 Reels Post': 1, '1 Product Catalog Post': 1 }, met: [214, 138, 0, 0, 6, 2], spend: 0 }
      },
      collab: { 'SAREE REEL': { yes: 1, no: 1, views: 0 }, 'SAREE PHOTO': { yes: 0, no: 0, views: 58300 } }
    },
    r2: {
      groups: groups,
      leads: { 'Total leads': 92, 'Outgoing': 2, 'Incoming': 29, 'Qualified': 13, 'Disqualified': 76, 'Un Identified': 2, 'No. Of Visits': 3, 'No. of Parties Giving Order by Visit': 3, 'No. of Parties Giving Order by Phone': 2 },
      orders: { 'Visit Order': { pcs: 46, amt: 19076 }, 'Phone Order': { pcs: 0, amt: 0 } }
    }
  },
  collabLog: [{ date: '2026-11-20', item: 'SAREE PHOTO', name: 'SRIJA BHOWMICK', views: 58300 }]
};
