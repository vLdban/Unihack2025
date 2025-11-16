// Date pentru centre de reciclare din România
export const romaniaRegions = [
  {
    id: 1,
    name: "București",
    coords: [[44.3, 25.9], [44.3, 26.3], [44.5, 26.3], [44.5, 25.9]],
    center: [44.4268, 26.1025],
    recyclingCenters: [
      { id: 101, name: "Centru Reciclare Sector 1", lat: 44.4792, lng: 26.0783 },
      { id: 102, name: "Eco Punct Berceni", lat: 44.3823, lng: 26.1124 },
      { id: 103, name: "Reciclare Pantelimon", lat: 44.4456, lng: 26.2356 },
      { id: 104, name: "Green Point Militari", lat: 44.4388, lng: 25.9877 },
      { id: 105, name: "Centru Reciclare Titan", lat: 44.4331, lng: 26.1716 },
    ]
  },
  {
    id: 2,
    name: "Cluj",
    coords: [[46.5, 23.3], [46.5, 23.9], [46.9, 23.9], [46.9, 23.3]],
    center: [46.7712, 23.6236],
    recyclingCenters: [
      { id: 201, name: "Reciclare Cluj-Napoca Centru", lat: 46.7712, lng: 23.6236 },
      { id: 202, name: "Eco Punct Mănăștur", lat: 46.7625, lng: 23.5656 },
      { id: 203, name: "Green Center Zorilor", lat: 46.7599, lng: 23.5793 },
      { id: 204, name: "Reciclare Grigorescu", lat: 46.7450, lng: 23.6100 },
    ]
  },
  {
    id: 3,
    name: "Brașov",
    coords: [[45.4, 25.3], [45.4, 25.8], [45.8, 25.8], [45.8, 25.3]],
    center: [45.6579, 25.6012],
    recyclingCenters: [
      { id: 301, name: "Green Point Brașov Centru", lat: 45.6579, lng: 25.6012 },
      { id: 302, name: "Reciclare Tractorul", lat: 45.6419, lng: 25.5919 },
      { id: 303, name: "Eco Centru Astra", lat: 45.6436, lng: 25.6086 },
    ]
  },
  {
    id: 4,
    name: "Timișoara",
    coords: [[45.6, 21.1], [45.6, 21.4], [45.9, 21.4], [45.9, 21.1]],
    center: [45.7489, 21.2087],
    recyclingCenters: [
      { id: 401, name: "Centru Reciclare Timișoara", lat: 45.7489, lng: 21.2087 },
      { id: 402, name: "Eco Punct Circumvalațiuni", lat: 45.7537, lng: 21.2266 },
      { id: 403, name: "Green Point Freidorf", lat: 45.7689, lng: 21.2374 },
    ]
  },
  {
    id: 5,
    name: "Iași",
    coords: [[47.0, 27.4], [47.0, 27.7], [47.3, 27.7], [47.3, 27.4]],
    center: [47.1585, 27.6014],
    recyclingCenters: [
      { id: 501, name: "Reciclare Iași Centru", lat: 47.1585, lng: 27.6014 },
      { id: 502, name: "Eco Iași Păcurari", lat: 47.1722, lng: 27.6030 },
      { id: 503, name: "Green Point Tudor", lat: 47.1456, lng: 27.6156 },
    ]
  },
  {
    id: 6,
    name: "Constanța",
    coords: [[43.9, 28.4], [43.9, 28.8], [44.4, 28.8], [44.4, 28.4]],
    center: [44.1598, 28.6348],
    recyclingCenters: [
      { id: 601, name: "Centru Reciclare Constanța", lat: 44.1598, lng: 28.6348 },
      { id: 602, name: "Eco Punct Mamaia", lat: 44.2475, lng: 28.6141 },
      { id: 603, name: "Green Point Palazu Mare", lat: 44.1189, lng: 28.6258 },
      { id: 604, name: "Reciclare Zona Industrială", lat: 44.1756, lng: 28.6589 },
    ]
  },
  {
    id: 7,
    name: "Sibiu",
    coords: [[45.6, 23.9], [45.6, 24.3], [45.9, 24.3], [45.9, 23.9]],
    center: [45.7983, 24.1256],
    recyclingCenters: [
      { id: 701, name: "Reciclare Sibiu Centru", lat: 45.7983, lng: 24.1256 },
      { id: 702, name: "Eco Sibiu Terezian", lat: 45.7921, lng: 24.1415 },
      { id: 703, name: "Green Point Hipodrom", lat: 45.7824, lng: 24.1387 },
    ]
  },
  {
    id: 8,
    name: "Craiova",
    coords: [[44.2, 23.6], [44.2, 23.9], [44.4, 23.9], [44.4, 23.6]],
    center: [44.3302, 23.7949],
    recyclingCenters: [
      { id: 801, name: "Centru Reciclare Craiova", lat: 44.3302, lng: 23.7949 },
      { id: 802, name: "Eco Craiova Brazda", lat: 44.3156, lng: 23.8234 },
      { id: 803, name: "Green Point 1 Mai", lat: 44.3389, lng: 23.7756 },
    ]
  },
  {
    id: 9,
    name: "Galați",
    coords: [[45.3, 27.9], [45.3, 28.2], [45.6, 28.2], [45.6, 27.9]],
    center: [45.4353, 28.0080],
    recyclingCenters: [
      { id: 901, name: "Reciclare Galați Centru", lat: 45.4353, lng: 28.0080 },
      { id: 902, name: "Eco Galați Mazepa", lat: 45.4512, lng: 28.0234 },
      { id: 903, name: "Green Point Tiglina", lat: 45.4189, lng: 27.9945 },
    ]
  },
  {
    id: 10,
    name: "Oradea",
    coords: [[46.9, 21.8], [46.9, 22.1], [47.2, 22.1], [47.2, 21.8]],
    center: [47.0465, 21.9189],
    recyclingCenters: [
      { id: 1001, name: "Centru Reciclare Oradea", lat: 47.0465, lng: 21.9189 },
      { id: 1002, name: "Eco Oradea Ioșia", lat: 47.0356, lng: 21.9456 },
      { id: 1003, name: "Green Point Velenței", lat: 47.0589, lng: 21.9012 },
    ]
  },
  {
    id: 11,
    name: "Bacău",
    coords: [[46.4, 26.7], [46.4, 27.0], [46.7, 27.0], [46.7, 26.7]],
    center: [46.5670, 26.9146],
    recyclingCenters: [
      { id: 1101, name: "Reciclare Bacău Centru", lat: 46.5670, lng: 26.9146 },
      { id: 1102, name: "Eco Bacău Miorița", lat: 46.5823, lng: 26.9289 },
    ]
  },
  {
    id: 12,
    name: "Arad",
    coords: [[46.0, 21.2], [46.0, 21.5], [46.3, 21.5], [46.3, 21.2]],
    center: [46.1865, 21.3123],
    recyclingCenters: [
      { id: 1201, name: "Centru Reciclare Arad", lat: 46.1865, lng: 21.3123 },
      { id: 1202, name: "Eco Arad Micălaca", lat: 46.1756, lng: 21.3345 },
      { id: 1203, name: "Green Point Grădișt", lat: 46.1945, lng: 21.2989 },
    ]
  },
  {
    id: 13,
    name: "Pitești",
    coords: [[44.7, 24.7], [44.7, 25.0], [45.0, 25.0], [45.0, 24.7]],
    center: [44.8565, 24.8692],
    recyclingCenters: [
      { id: 1301, name: "Reciclare Pitești Centru", lat: 44.8565, lng: 24.8692 },
      { id: 1302, name: "Eco Pitești Trivale", lat: 44.8423, lng: 24.8834 },
    ]
  },
  {
    id: 14,
    name: "Brăila",
    coords: [[45.1, 27.8], [45.1, 28.1], [45.4, 28.1], [45.4, 27.8]],
    center: [45.2692, 27.9575],
    recyclingCenters: [
      { id: 1401, name: "Centru Reciclare Brăila", lat: 45.2692, lng: 27.9575 },
      { id: 1402, name: "Eco Brăila Viziru", lat: 45.2534, lng: 27.9712 },
    ]
  },
  {
    id: 15,
    name: "Ploiești",
    coords: [[44.8, 25.9], [44.8, 26.2], [45.1, 26.2], [45.1, 25.9]],
    center: [44.9408, 26.0228],
    recyclingCenters: [
      { id: 1501, name: "Reciclare Ploiești Nord", lat: 44.9408, lng: 26.0228 },
      { id: 1502, name: "Eco Ploiești Vest", lat: 44.9356, lng: 26.0045 },
      { id: 1503, name: "Green Point Bucov", lat: 44.9589, lng: 26.0389 },
    ]
  },
  {
    id: 16,
    name: "Suceava",
    coords: [[47.5, 26.1], [47.5, 26.4], [47.8, 26.4], [47.8, 26.1]],
    center: [47.6514, 26.2538],
    recyclingCenters: [
      { id: 1601, name: "Centru Reciclare Suceava", lat: 47.6514, lng: 26.2538 },
      { id: 1602, name: "Eco Suceava Burdujeni", lat: 47.6734, lng: 26.2689 },
      { id: 1603, name: "Green Point Zamca", lat: 47.6389, lng: 26.2412 },
      { id: 1604, name: "Reciclare Itcani", lat: 47.6612, lng: 26.2734 },
    ]
  },
];

// Calculează totalul de centre de reciclare
export const getTotalRecyclingCenters = () => {
  return romaniaRegions.reduce((acc, region) => acc + region.recyclingCenters.length, 0);
};
