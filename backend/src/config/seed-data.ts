import { CreateDateSettingDto } from 'src/date-setting/dto/create-date-setting.dto';
import { CreateRegistrationFeeDto } from 'src/registration-fee/dto/create-registration-fee.dto';
import { CreateReviewSettingDto } from 'src/review-setting/dto/create-review-setting.dto';
import {
  AbstractFieldEnum,
  AbstractMark,
  CountryType,
  RegistrationCategory,
  RegistrationType,
  UserType,
} from 'src/types/types';

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

export const DateSettingSeedData: CreateDateSettingDto[] = [
  {
    name: RegistrationType.EARLY_BIRD,
    start_date: new Date('2025-06-20'),
    end_date: new Date('2025-10-20'),
  },
  {
    name: RegistrationType.REGULAR,
    start_date: new Date('2025-10-21'),
    end_date: new Date('2025-11-20'),
  },
  {
    name: RegistrationType.LATE,
    start_date: new Date('2025-11-21'),
    end_date: new Date('2025-11-28'),
  },
];

export const ReviewSetting_Seed_Data: CreateReviewSettingDto[] = [
  {
    type: AbstractFieldEnum.PURPOSE,
    name: AbstractMark.EXCELLENT,
    value: 4,
    description:
      'The purpose is clearly stated, highly focused, and addresses a significant research problem.',
  },
  {
    type: AbstractFieldEnum.PURPOSE,
    name: AbstractMark.VERY_GOOD,
    value: 3,
    description:
      'The purpose is clear and relevant with minor scope for refinement.',
  },
  {
    type: AbstractFieldEnum.PURPOSE,
    name: AbstractMark.GOOD,
    value: 2,
    description:
      'The purpose is somewhat clear but lacks precision or strong significance.',
  },
  {
    type: AbstractFieldEnum.PURPOSE,
    name: AbstractMark.WEAK,
    value: 1,
    description: 'The purpose is unclear, vague, or not well-defined.',
  },

  {
    type: AbstractFieldEnum.METHODOLOGY,
    name: AbstractMark.EXCELLENT,
    value: 4,
    description:
      'Methodology is clearly defined, highly appropriate, and rigorously designed; strong alignment with research objectives.',
  },
  {
    type: AbstractFieldEnum.METHODOLOGY,
    name: AbstractMark.VERY_GOOD,
    value: 3,
    description:
      'Methodology is appropriate and clearly described with minor limitations.',
  },
  {
    type: AbstractFieldEnum.METHODOLOGY,
    name: AbstractMark.GOOD,
    value: 2,
    description:
      'Methodology is somewhat appropriate but lacks clarity or sufficient detail.',
  },
  {
    type: AbstractFieldEnum.METHODOLOGY,
    name: AbstractMark.WEAK,
    value: 1,
    description: 'Methodology is unclear, inappropriate, or poorly described.',
  },

  {
    type: AbstractFieldEnum.FINDINGS,
    name: AbstractMark.EXCELLENT,
    value: 4,
    description:
      'Findings are clearly presented, insightful, and highly relevant; strong contribution to the topic.',
  },
  {
    type: AbstractFieldEnum.FINDINGS,
    name: AbstractMark.VERY_GOOD,
    value: 3,
    description:
      'Findings are clear and relevant with minor limitations in depth or interpretation.',
  },
  {
    type: AbstractFieldEnum.FINDINGS,
    name: AbstractMark.GOOD,
    value: 2,
    description:
      'Findings are somewhat clear but lack depth or strong relevance.',
  },
  {
    type: AbstractFieldEnum.FINDINGS,
    name: AbstractMark.WEAK,
    value: 1,
    description: 'Findings are unclear, missing, or not meaningful.',
  },

  {
    type: AbstractFieldEnum.THEORETICAL,

    name: AbstractMark.EXCELLENT,
    value: 4,
    description:
      'Provides strong and meaningful theoretical contribution; advances existing knowledge.',
  },
  {
    type: AbstractFieldEnum.THEORETICAL,

    name: AbstractMark.VERY_GOOD,
    value: 3,
    description:
      'Offers clear theoretical relevance with moderate contribution.',
  },
  {
    type: AbstractFieldEnum.THEORETICAL,

    name: AbstractMark.GOOD,
    value: 2,
    description:
      'Limited theoretical contribution; somewhat connected to existing theory.',
  },
  {
    type: AbstractFieldEnum.THEORETICAL,

    name: AbstractMark.WEAK,
    value: 1,
    description: 'No clear theoretical contribution.',
  },

  {
    type: AbstractFieldEnum.PRACTICAL,
    name: AbstractMark.EXCELLENT,
    value: 4,
    description:
      'Highly relevant and actionable implications for practice; strong real-world value.',
  },
  {
    type: AbstractFieldEnum.PRACTICAL,
    name: AbstractMark.VERY_GOOD,
    value: 3,
    description: 'Clear and useful implications with good practical relevance.',
  },
  {
    type: AbstractFieldEnum.PRACTICAL,
    name: AbstractMark.GOOD,
    value: 2,
    description: 'Some practical relevance but limited applicability.',
  },
  {
    type: AbstractFieldEnum.PRACTICAL,
    name: AbstractMark.WEAK,
    value: 1,
    description: 'Little or no practical relevance.',
  },
  {
    type: AbstractFieldEnum.OVERALL,
    name: AbstractMark.EXCELLENT,
    value: 4,
    description: 'Accept (Oral Presentation)',
  },
  {
    type: AbstractFieldEnum.OVERALL,
    name: AbstractMark.VERY_GOOD,
    value: 3,
    description: 'Accept (Poster / Minor Revision)',
  },
  {
    type: AbstractFieldEnum.OVERALL,
    name: AbstractMark.GOOD,
    value: 2,
    description: 'Revise and Resubmit',
  },
  {
    type: AbstractFieldEnum.OVERALL,
    name: AbstractMark.WEAK,
    value: 1,
    description: 'Reject',
  },
];

export const RegistrationFeeSeedData: CreateRegistrationFeeDto[] = [
  {
    id: 1,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.ACADEMIC,
    country_type: CountryType.LOCAL,
    early_bird_amount: 5000,
    regular_amount: 7500,
    late_amount: 9000,
  },
  {
    id: 2,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.INDUSTRY,
    country_type: CountryType.LOCAL,
    early_bird_amount: 5000,
    regular_amount: 7500,
    late_amount: 9000,
  },
  {
    id: 3,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.STUDENT,
    country_type: CountryType.LOCAL,
    early_bird_amount: 2000,
    regular_amount: 3000,
    late_amount: 3500,
  },
  {
    id: 4,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.ACADEMIC,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 150,
    late_amount: 200,
  },
  {
    id: 5,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.INDUSTRY,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 150,
    late_amount: 200,
  },
  {
    id: 6,
    registration_category: RegistrationCategory.WITH_PAPER,
    user_type: UserType.STUDENT,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 150,
    late_amount: 200,
  },
  {
    id: 7,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.ACADEMIC,
    country_type: CountryType.LOCAL,
    early_bird_amount: 5000,
    regular_amount: 5000,
    late_amount: 5000,
  },
  {
    id: 8,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.INDUSTRY,
    country_type: CountryType.LOCAL,
    early_bird_amount: 5000,
    regular_amount: 5000,
    late_amount: 5000,
  },
  {
    id: 9,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.STUDENT,
    country_type: CountryType.LOCAL,
    early_bird_amount: 5000,
    regular_amount: 5000,
    late_amount: 5000,
  },
  {
    id: 10,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.ACADEMIC,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 100,
    late_amount: 100,
  },
  {
    id: 11,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.INDUSTRY,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 100,
    late_amount: 100,
  },
  {
    id: 12,
    registration_category: RegistrationCategory.WITHOUT_PAPER,
    user_type: UserType.STUDENT,
    country_type: CountryType.INTERNATIONAL,
    early_bird_amount: 100,
    regular_amount: 100,
    late_amount: 100,
  },
];
