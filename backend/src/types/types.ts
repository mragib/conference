export type ApiResponse<T> = {
  status: string;
  statuscode: number;
  message?: string;
  data: T;
  count?: number;
};

export type JWTPayload = {
  sub: string;
};

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  AUTHORITY = 'AUTHORITY',
  RESEARCHER = 'RESEARCHER',
  REVIEWER = 'REVIEWER',
}

export enum UserType {
  ACADEMIC = 'ACADEMIC',
  INDUSTRY = 'INDUSTRY',
  STUDENT = 'STUDENT',
}

export type ReviewerAssignResult = {
  reviewerId: string;
  userName: string;
  assignCount: number;
};

// export const REVIEWER_SEED_DATA = [
//   { name: 'Dr. Alice Smith', email: '8pa6ge8uih@wshu.net', display_order: 6 },
//   { name: 'Dr. Bob Johnson', email: 'dayarol475@googxs.com', display_order: 7 },
//   {
//     name: 'Dr. Carol Williams',
//     email: 'galina.acosta@sudarin.online',
//     display_order: 8,
//   },
//   { name: 'Dr. David Brown', email: 'anefy@mailto.plus', display_order: 9 },
// ];

export const REVIEWER_SEED_DATA = [
  {
    name: 'Dr. Tanbir Ahmed Chowdhury',
    email: 'tanbir@ewubd.edu',
    display_order: 2,
  },
  {
    name: 'Dr. Anup Chowdhury',
    email: 'anup@ewubd.edu',
    display_order: 3,
  },
  {
    name: 'Dr. Jashim Uddin',
    email: 'juddin@ewubd.edu',
    display_order: 4,
  },
  {
    name: 'Dr. Farhana Ferdousi',
    email: 'farhana@ewubd.edu',
    display_order: 5,
  },
  {
    name: 'Dr. Nikhil Chandra Shil',
    email: 'nikhil@ewubd.edu',
    display_order: 6,
  },
  {
    name: 'Dr. Md. Ariful Islam',
    email: 'mdariful.islam@ewubd.edu',
    display_order: 1,
  },
  {
    name: 'Dr. M. Sayeed Alam',
    email: 'sayeed@ewubd.edu',
    display_order: 7,
  },
  {
    name: 'Dr. Rumana Afroze',
    email: 'rua@ewubd.edu',
    display_order: 8,
  },
  {
    name: 'Dr. Md. Rashidul Islam',
    email: 'mrdi@ewubd.edu',
    display_order: 9,
  },
  {
    name: 'Dr. Quazi Sagota Samina',
    email: 'qss@ewubd.edu',
    display_order: 10,
  },
  {
    name: 'Dr. Md. Atiqur Rahman Sarker',
    email: 'mars@ewubd.edu',
    display_order: 11,
  },
  {
    name: 'Dr. Salma Akter',
    email: 'drsalma@ewubd.edu',
    display_order: 12,
  },
  {
    name: 'Dr. Mohammad Zakaria Masud',
    email: 'zakaria.masud@ewubd.edu',
    display_order: 13,
  },
  {
    name: 'Md. Anamul Hoque',
    email: 'a_haque@ewubd.edu',
    display_order: 14,
  },
  {
    name: 'Dr. Mahnoor Sattar',
    email: 'mahnoor@ewubd.edu',
    display_order: 15,
  },
  {
    name: 'Dr. Aswini Yadlapalli',
    email: 'aswini.yadlapalli2@rmit.edu.au',
    display_order: 16,
  },
  {
    name: 'Dr. Kamrul Ahsan',
    email: 'kamrul.ahsan@rmit.edu.au',
    display_order: 17,
  },
  {
    name: 'Dr. Vinh Thai',
    email: 'vinh.thai@rmit.edu.au',
    display_order: 18,
  },
  {
    name: 'Dr. Booi Kam',
    email: 'booi.kam@rmit.edu.au',
    display_order: 19,
  },
  {
    name: 'Md Maruf Hossan Chowdhury',
    email: 'Maruf.Chowdhury@uts.edu.au',
    display_order: 20,
  },
  {
    name: 'Dr. Sanjay Paul',
    email: 'Sanjoy.Paul@uts.edu.au',
    display_order: 21,
  },
  {
    name: 'Dr. Ravi Shankar',
    email: 'ravi1@dms.iitd.ernet.in',
    display_order: 22,
  },
  {
    name: 'Dr. Rahat Munir',
    email: 'rahat.munir@mq.edu.au',
    display_order: 23,
  },
  {
    name: 'Dr. Pradeep Kanta Ray',
    email: 'pray@unsw.edu.au',
    display_order: 24,
  },
  {
    name: 'Dr. Nachippan Subramanian',
    email: 'N.Subramanian@sussex.ac.uk',
    display_order: 25,
  },
  {
    name: 'Dr. Andrew Potter',
    email: 'PotterAT@cardiff.ac.uk',
    display_order: 26,
  },
  {
    name: 'Dr. Tritos Laosirihongthong',
    email: 'ltritos@engr.tu.ac.th',
    display_order: 27,
  },
  {
    name: 'Dr. Md. Rezaul Hasan Shumon',
    email: 'm.shumon@squ.edu.om',
    display_order: 28,
  },
  {
    name: 'Dr. Partha Priya Datta',
    email: 'ppdatta@iimcal.ac.in',
    display_order: 29,
  },
  {
    name: 'Dr. Ir. I Nyoman Pujawan',
    email: 'pujawan@gmail.com',
    display_order: 30,
  },
  {
    name: 'Dr. Smaraki Pattanayak',
    email: 'smaraki.pattanayak@asbm.ac.in',
    display_order: 31,
  },
  {
    name: 'Dr. Himanshu Shee',
    email: 'himanshu.shee@vu.edu.au',
    display_order: 32,
  },
  {
    name: 'Dr. Mohammad Quaddus',
    email: 'M.Quaddus@curtin.edu.au',
    display_order: 33,
  },
  {
    name: 'Dr. A.K.M Masud',
    email: 'masud1@ipe.buet.ac.bd',
    display_order: 34,
  },
  {
    name: 'Dr. Nasrin Akter',
    email: 'nasrin.akter@du.ac.bd',
    display_order: 35,
  },
  {
    name: 'Dr. Choudhury Abul Anam Rashed',
    email: 'rashed-ipe@sust.edu',
    display_order: 36,
  },
  {
    name: 'Dr. Md. Abdul Momen',
    email: 'momeniium@gmail.com',
    display_order: 37,
  },
  {
    name: 'Dr. Md. Abdur Rahman',
    email: 'arahman@aiub.edu',
    display_order: 38,
  },
  {
    name: 'Dr. Md Abdul Hoque',
    email: 'abdul.hoque@bracu.ac.bd',
    display_order: 39,
  },
  {
    name: 'Dr. Salma Karim',
    email: 'salma@bus.uiu.ac.bd',
    display_order: 40,
  },
  {
    name: 'Dr. Seyama Sultana',
    email: 'seyama@bus.uiu.ac.bd',
    display_order: 41,
  },
];
export enum RegistrationType {
  EARLY_BIRD = 'EARLY BIRD',
  REGULAR = 'REGULAR',
  LATE = 'LATE',
}

export enum CountryType {
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
}
