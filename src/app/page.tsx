"use client";

import * as React from "react";
import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorInput } from "@/components/color-input";
import { ColorSwatch } from "@/components/color-swatch";
import { generatePalette } from "@/lib/colors";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Color = {
  id: number;
  value: string;
};

type PaletteScheme = 'complementary' | 'analogous' | 'triadic';


export default function Home() {
  const [baseColors, setBaseColors] = React.useState<Color[]>([
    { id: 1, value: "#FCE4EC" }, // Initial pastel pink
  ]);
  const [generatedPalette, setGeneratedPalette] = React.useState<string[]>([]);
  const [nextId, setNextId] = React.useState(2);
  const [scheme, setScheme] = React.useState<PaletteScheme>('analogous');


   // Generate initial palette on mount
  React.useEffect(() => {
    if (baseColors.length > 0) {
      const initialPalette = generatePalette(baseColors[0].value, scheme);
      setGeneratedPalette(initialPalette);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount


  const handleColorChange = (id: number, newValue: string) => {
    setBaseColors(prevColors =>
      prevColors.map(color =>
        color.id === id ? { ...color, value: newValue } : color
      )
    );
  };

  const addColorInput = () => {
    if (baseColors.length < 5) { // Limit to 5 base colors
      setBaseColors(prevColors => [
        ...prevColors,
        { id: nextId, value: "#FFFFFF" }, // Default new color to white
      ]);
      setNextId(prevId => prevId + 1);
    }
  };

   const removeColorInput = (idToRemove: number) => {
    setBaseColors(prevColors => prevColors.filter(color => color.id !== idToRemove));
     // If the removed color was the first one, regenerate palette based on the new first color
     if (baseColors.length > 1 && baseColors[0].id === idToRemove) {
         handleGeneratePalette(baseColors[1].value); // Use the next color as base
     } else if (baseColors.length === 1) {
        setGeneratedPalette([]); // Clear palette if no base colors left
     }
  };

  const handleGeneratePalette = (colorValue?: string) => {
    const base = colorValue ?? (baseColors.length > 0 ? baseColors[0].value : '#FCE4EC');
     if (base) {
        const newPalette = generatePalette(base, scheme);
        setGeneratedPalette(newPalette);
     } else {
        setGeneratedPalette([]); // Clear palette if no base color
     }
  };

  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen flex flex-col items-center">
      <Card className="w-full max-w-4xl shadow-lg rounded-xl mb-8 bg-card">
        <CardHeader className="text-center">
          {/* Apply sans-serif font for readability */}
          <CardTitle className="text-3xl font-bold text-primary font-sans">PalettePro</CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Create beautiful color palettes with ease.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
             {/* Apply sans-serif font for readability */}
             <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">Base Colors</h3>
            {baseColors.map((color, index) => (
              <ColorInput
                key={color.id}
                id={`color-${color.id}`}
                label={`Base Color ${index + 1}`}
                value={color.value}
                onChange={(newValue) => handleColorChange(color.id, newValue)}
                onRemove={() => removeColorInput(color.id)}
              />
            ))}
            {baseColors.length < 5 && (
                 <Button variant="outline" onClick={addColorInput} className="w-full mt-2 border-dashed border-primary text-primary hover:bg-secondary hover:text-primary">
                     <Plus className="mr-2 h-4 w-4" /> Add Base Color
                </Button>
            )}
          </div>

           <div className="flex flex-col sm:flex-row items-center gap-4">
             <Select value={scheme} onValueChange={(value: PaletteScheme) => setScheme(value)}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-md shadow-sm font-sans">
                  <SelectValue placeholder="Select Scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                </SelectContent>
              </Select>

            <Button
              onClick={() => handleGeneratePalette()}
              disabled={baseColors.length === 0}
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 rounded-md shadow-sm"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Generate Palette
            </Button>
          </div>
        </CardContent>
      </Card>


      {generatedPalette.length > 0 && (
         <Card className="w-full max-w-4xl shadow-lg rounded-xl bg-card">
            <CardHeader>
                 {/* Apply sans-serif font for readability */}
                 <CardTitle className="text-xl font-semibold text-center text-primary font-sans">Generated Palette</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {generatedPalette.map((color, index) => (
                    <ColorSwatch key={index} color={color} />
                  ))}
                </div>
            </CardContent>
         </Card>
      )}

    </main>
  );
}
