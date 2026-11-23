// EDIT NAMES HERE. Names come from your REPORT 2 and REPORT 3 sheets.
const groupNames = ["Minu Club","Online Saree's Sale","Bengal Handloom Pure Cotton Saree","Cotton Sarees Manufacturers","Saree Group","Saree World","Linen Saree Collection","Kota Saree Manufacturing Kolkata","Saree Collections 1.0 (Paid Group)","Saree Online Shopping #NYBSaree","Cotton Sarees","All India Sarees buying and selling","Saree collection online shopping","Chettinad Cotton Sarees","All India Silk Saree Group","Bengal Cotton Saree and jamdani saree","Cotton saree","Hyderabad ladies sarees group","Delhi Wholesale Market","Saree Resellers","Kanchipuram silk sarees (Wedding)","Sri sarees collection (whole sale & retail)","Kanchipuram weavers handloom silks sarees association","Saree collection","Saree Collections","Sarees collection","sarees manufacturer kuppadam","ভেবিয়া শ্মশান আশ্রম","Saree Bazar Online","Indian Saree Lovers","Begampuri, Dhonekhali and Fulia Cotton Sarees","Bengal HANDLOOM SAREES"];

export const defaultLayout = {
  platforms: [
    { name: 'INSTAGRAM', spend: true,  items: ['2 Reels Post', '2 Product Catalogue Image Posts', '2 Story Post'] },
    { name: 'FACEBOOK',  spend: true,  items: ['2 Reels Post', '2 Product Catalogue Image Posts', '1 Story Post', '1 Post in Market Place'] },
    { name: 'YOUTUBE',   spend: true,  items: ['2 Reels Post', 'Weekly 1 Long Video Post', '1 Product Catalog Post'] },
    { name: 'LINKED IN', spend: false, items: ['1 Business Post', '1 Reels Post', '1 Product Catalog Post'] },
    { name: 'THREADS',   spend: false, items: ['1 Reels Post', '1 Product Catalog Post'] }
  ],
  collab: ['SAREE REEL', 'SAREE PHOTO'],
  groups: groupNames.map((name, i) => ({ no: i + 1, name })),
  leads: ['Total leads', 'Outgoing', 'Incoming', 'Qualified', 'Disqualified', 'Un Identified', 'No. Of Visits', 'No. of Parties Giving Order by Visit', 'No. of Parties Giving Order by Phone'],
  orders: ['Visit Order', 'Phone Order'],
  tasks: ['Trend Research & Overall Market Reasearch', 'Video Editing', 'Graphics Creation & Editing', 'Post Caption Creation', 'Post Scheduling', 'Socil Media Comments & Leads Reply', 'FB Group Sharing (25-30 groups)', 'Whatsap Group Sharing', 'Linked In Posting & update', 'RSA SM Report', 'Post Boosting', 'Minu Fashions Ad spend Report', 'Influencer Outreach'],
  boxes: ['1. Any S_M Strategy Creation', '2. Content Calender Planning for the Month']
};
