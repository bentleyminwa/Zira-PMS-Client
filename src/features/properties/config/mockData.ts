import type { Property } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Sunset Crest Estates',
    description:
      'This charming modern residence is designed to offer the perfect blend of comfort and sophistication. The home features an open-concept layout with spacious living areas, high-end finishes, and stunning views of the surrounding hills.',
    address: '1234 Market Street, CA 94103',
    city: 'California, USA',
    price: 332600,
    type: 'APARTMENT',

    bedrooms: 3,
    bathrooms: 2,
    size: 108,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    features: ['Pool', '120mbs WiFi', '1 Garage'],
    status: 'AVAILABLE',
  },
  {
    id: '2',
    name: 'Maple Grove Residence',
    description:
      'A beautiful family home located in a quiet neighborhood. This property boasts a large backyard, modern kitchen, and energy-efficient appliances.',
    address: '5678 Sunset Boulevard, CA 94103',
    city: 'California, USA',
    price: 324800,
    type: 'HOUSE',

    bedrooms: 4,
    bathrooms: 3,
    size: 164,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: ['Backyard', 'Modern Kitchen', 'Solar Panels'],
    status: 'AVAILABLE',
  },
  {
    id: '3',
    name: 'VillaSand',
    description:
      'Experience luxury at its finest in this stunning coastal villa. Perfect for those who enjoy the finer things in life with direct beach access and private security.',
    address: '1147 Plage Street, CA 84245',
    city: 'Nice, France',
    price: 286400,
    type: 'CONDO',

    bedrooms: 2,
    bathrooms: 2,
    size: 104,
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    features: ['Direct Beach Access', 'Smart Home', 'Wine Cellar'],
    status: 'AVAILABLE',
  },
];
