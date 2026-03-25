const campusLocations = [
  {
    id: 'brown-kopel',
    name: 'Brown-Kopel Hall',
    restaurants: [
      { id: 'cafe-25', name: 'Cafe 25', type: 'Cafe', status: 'Open Now' }
    ]
  },
  {
    id: 'food-trucks',
    name: 'Food Trucks',
    restaurants: [
      { id: 'amsterdam-cafe', name: 'Amsterdam Cafe', type: 'Food Truck', status: 'Open Now' },
      { id: 'amsterdam-taco', name: 'Amsterdam Taco', type: 'Food Truck', status: 'Open Now' },
      { id: 'bens-pretzels', name: "Ben's Soft Pretzels", type: 'Snacks', status: 'Open Now' },
      { id: 'holoway-bbq', name: 'Holoway BBQ', type: 'BBQ', status: 'Open Now' },
      { id: 'shake-on-it', name: "Let's Shake On It", type: 'Drinks/Snacks', status: 'Open Now' },
      { id: 'maria-cuban', name: 'Maria Cuban Sandwiches', type: 'Sandwiches', status: 'Open Now' },
      { id: 'nursing-amsterdam-taco', name: 'Nursing - Amsterdam Taco', type: 'Food Truck', status: 'Closed' },
      { id: 'nursing-amsterdam-cafe', name: 'Nursing - Amsterdamn Cafe', type: 'Food Truck', status: 'Closed' },
      { id: 'nursing-holloway', name: 'Nursing - Holloway BBQ Truck', type: 'BBQ', status: 'Closed' },
      { id: 'nursing-maria', name: 'Nursing - Maria Cuban Sandwiches', type: 'Sandwiches', status: 'Closed' },
      { id: 'nursing-nycgyro', name: 'Nursing - NYCGYRO', type: 'Halal/Gyro', status: 'Closed' },
      { id: 'nycgyro', name: 'NYCGYRO', type: 'Halal/Gyro', status: 'Open Now' },
      { id: 'philly-connection', name: 'Philly Connection', type: 'Sandwiches', status: 'Open Now' },
      { id: 'the-tea', name: 'The Tea', type: 'Drinks', status: 'Open Now' },
      { id: 'travelin-tom', name: "Travelin' Tom", type: 'Coffee/Drinks', status: 'Open Now' },
      { id: 'turn-burn', name: 'Turn & Burn Food Truck', type: 'Food Truck', status: 'Open Now' }
    ]
  },
  {
    id: 'foy',
    name: 'Foy Union',
    restaurants: [
      { id: 'csc-foy', name: 'Chicken Salad Chick', type: 'Sandwiches', status: 'Open Now' },
      { id: 'panda-foy', name: 'Panda Express', type: 'Asian', status: 'Open Now' }
    ]
  },
  {
    id: 'haley',
    name: 'Haley Center',
    restaurants: [
      { id: 'einstein-haley', name: 'Einstein Bros. Bagels', type: 'Bagels/Coffee', status: 'Open Now' }
    ]
  },
  {
    id: 'harbert',
    name: 'Harbert School of Business',
    restaurants: [
      { id: 'exchange-cafe', name: 'The Exchange', type: 'Cafe', status: 'Open Now' }
    ]
  },
  {
    id: 'heyday',
    name: 'Hey Day Market',
    restaurants: [
      { id: 'hey-batta', name: 'Hey Batta Batta', type: 'Dessert', status: 'Open Now' },
      { id: 'khoodles', name: 'Khoodles', type: 'Noodles', status: 'Open Now' },
      { id: 'little-darling', name: 'Little Darling', type: 'Burgers', status: 'Open Now' },
      { id: 'loud-roots', name: 'Loud Roots', type: 'Healthy', status: 'Open Now' },
      { id: 'pasta-bari', name: 'Pasta Bari', type: 'Italian', status: 'Open Now' },
      { id: 'pizzeria-ariccia', name: 'Pizzeria Ariccia', type: 'Pizza', status: 'Open Now' },
      { id: 'pokemen', name: 'Pokemen', type: 'Sushi/Poke', status: 'Open Now' },
      { id: 'saint-bernardo', name: 'Saint Bernardo', type: 'Sandwiches', status: 'Open Now' },
      { id: 'incubator', name: 'The Incubator', type: 'Various', status: 'Open Now' },
      { id: 'wildchild', name: 'Wildchild', type: 'Tacos', status: 'Open Now' }
    ]
  },
  {
    id: 'lowder',
    name: 'Lowder Hall',
    restaurants: [
      { id: 'sbux-lowder', name: 'Starbucks', type: 'Coffee', status: 'Open Now' }
    ]
  },
  {
    id: 'melton',
    name: 'Melton Student Center',
    restaurants: [
      { id: 'blenz-melton', name: 'Blenz', type: 'Smoothies/Bowls', status: 'Open Now' },
      { id: 'cfa-melton', name: 'CFA', type: 'Fast Food', status: 'Open Now' },
      { id: 'inked-tacos', name: 'Inked Tacos', type: 'Tex-Mex', status: 'Open Now' },
      { id: 'hot-chicken', name: 'Original Hot Chicken/Flametown', type: 'Chicken', status: 'Open Now' },
      { id: 'sbux-melton', name: 'Starbucks', type: 'Coffee', status: 'Open Now' },
      { id: 'toro-melton', name: 'Toro Sushi', type: 'Sushi', status: 'Open Now' }
    ]
  },
  {
    id: 'village',
    name: 'Village Dining',
    restaurants: [
      { id: 'cfa-village', name: 'CFA', type: 'Fast Food', status: 'Open Now' },
      { id: 'toro-village', name: 'Toro Sushi', type: 'Sushi', status: 'Open Now' },
      { id: 'blenz-village', name: 'Village Blenz', type: 'Smoothies', status: 'Open Now' },
      { id: 'village-hall', name: 'Village Dining Hall', type: 'Dining Hall', status: 'Open Now' }
    ]
  }
];