// Basic color conversion functions
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
    const componentToHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// Palette generation logic
export function generatePalette(baseColorHex: string, scheme: 'complementary' | 'analogous' | 'triadic' = 'analogous'): string[] {
  const rgb = hexToRgb(baseColorHex);
  if (!rgb) return [baseColorHex];

  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const paletteHsl: { h: number; s: number; l: number }[] = [{ h, s, l }];

  switch (scheme) {
    case 'complementary':
      paletteHsl.push({ h: (h + 180) % 360, s, l });
      // Add variations
      paletteHsl.push({ h, s: Math.max(0, s - 20), l: Math.min(100, l + 20) });
      paletteHsl.push({ h, s, l: Math.max(0, l - 20) });
      paletteHsl.push({ h: (h + 180) % 360, s: Math.max(0, s - 20), l: Math.min(100, l + 20) });
      break;
    case 'analogous':
      paletteHsl.push({ h: (h + 30) % 360, s, l });
      paletteHsl.push({ h: (h - 30 + 360) % 360, s, l });
      // Add variations
      paletteHsl.push({ h, s: Math.max(0, s - 15), l: Math.min(100, l + 15) });
      paletteHsl.push({ h: (h + 30) % 360, s: Math.max(0, s - 15), l: Math.max(0, l - 15) });

      break;
    case 'triadic':
      paletteHsl.push({ h: (h + 120) % 360, s, l });
      paletteHsl.push({ h: (h + 240) % 360, s, l });
       // Add variations
      paletteHsl.push({ h, s: Math.max(0, s - 10), l: Math.min(100, l + 10) });
      paletteHsl.push({ h: (h + 120) % 360, s: Math.max(0, s - 10), l: Math.max(0, l - 10) });
      break;
    default:
      // Default to analogous with variations
      paletteHsl.push({ h: (h + 30) % 360, s, l });
      paletteHsl.push({ h: (h - 30 + 360) % 360, s, l });
      paletteHsl.push({ h, s: Math.max(0, s - 15), l: Math.min(100, l + 15) });
      paletteHsl.push({ h: (h + 30) % 360, s: Math.max(0, s - 15), l: Math.max(0, l - 15) });
  }

  return paletteHsl.map(hsl => {
      const { r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l);
      return rgbToHex(r,g,b);
  });
}

// Function to get contrasting text color (black or white)
export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000'; // Default to black if hex is invalid

  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  // Use white text for dark backgrounds, black text for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}