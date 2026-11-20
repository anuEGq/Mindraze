/** Kerala's 14 districts with approximate headquarters coordinates (for the illustrative map). */
export const keralaDistricts = [
  { name: "Kasaragod", lat: 12.4996, lon: 74.9869 },
  { name: "Kannur", lat: 11.8745, lon: 75.3704 },
  { name: "Wayanad", lat: 11.6085, lon: 76.083 },
  { name: "Kozhikode", lat: 11.2588, lon: 75.7804 },
  { name: "Malappuram", lat: 11.051, lon: 76.0711 },
  { name: "Palakkad", lat: 10.7867, lon: 76.6548 },
  { name: "Thrissur", lat: 10.5276, lon: 76.2144 },
  { name: "Ernakulam", lat: 10.0159, lon: 76.3419 },
  { name: "Idukki", lat: 9.85, lon: 76.94 },
  { name: "Kottayam", lat: 9.5916, lon: 76.5222 },
  { name: "Alappuzha", lat: 9.4981, lon: 76.3388 },
  { name: "Pathanamthitta", lat: 9.2648, lon: 76.787 },
  { name: "Kollam", lat: 8.8932, lon: 76.6141 },
  { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
] as const;

export const districtNames = keralaDistricts.map((d) => d.name);

/** Simplified state outline (lat, lon), clockwise from the northern coast. Illustrative only. */
export const keralaOutline: [number, number][] = [
  [12.79, 74.86], [12.72, 74.88], [12.5, 74.97], [12.39, 75.02], [12.25, 75.09], [12.1, 75.19],
  [11.87, 75.35], [11.75, 75.47], [11.6, 75.57], [11.44, 75.68], [11.25, 75.76], [10.98, 75.85],
  [10.77, 75.91], [10.58, 76.0], [10.22, 76.16], [9.96, 76.23], [9.49, 76.31], [9.17, 76.44],
  [8.88, 76.57], [8.73, 76.69], [8.48, 76.91], [8.38, 76.98], [8.29, 77.07],
  [8.34, 77.17], [8.53, 77.18], [8.76, 77.16], [8.97, 77.17], [9.3, 77.2], [9.6, 77.18],
  [9.98, 77.3], [10.25, 77.27], [10.36, 77.2], [10.38, 76.97], [10.62, 76.86], [10.85, 76.86],
  [11.1, 76.79], [11.25, 76.52], [11.45, 76.41], [11.68, 76.38], [11.9, 76.16], [11.96, 76.02],
  [11.98, 75.86], [12.05, 75.76], [12.38, 75.46], [12.6, 75.26], [12.75, 75.02],
];
