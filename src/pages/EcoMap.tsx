import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from "react-leaflet";
import { supabase } from "@/integrations/supabase/client";
import { TopNavBar } from "@/components/TopNavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock, Unlock, Trophy, Camera, Upload, MapPinned } from "lucide-react";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { romaniaRegions } from "@/data/romaniaRegions";

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const EcoMap = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [unlockedRegions, setUnlockedRegions] = useState<number[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUser(user);
      
      // Load unlocked regions from localStorage
      const saved = localStorage.getItem(`eco_map_unlocked_${user.id}`);
      if (saved) {
        try {
          setUnlockedRegions(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing saved data:', e);
          setUnlockedRegions([]);
        }
      }
      
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

 
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
  };

  const verifyLocation = async (center: any): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        toast.error("GPS-ul nu este disponibil pe acest dispozitiv!");
        resolve(false);
        return;
      }

      toast.info("Verificăm locația ta...", {
        description: "Trebuie să fii la max 100m de centru"
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const distance = calculateDistance(userLat, userLng, center.lat, center.lng);

          console.log(`Distanța până la ${center.name}: ${distance.toFixed(0)}m`);

          if (distance <= 100) {
            toast.success("Locație verificată! ✓", {
              description: `Ești la ${distance.toFixed(0)}m de centru`
            });
            resolve(true);
          } else {
            toast.error("Prea departe de centru!", {
              description: `Trebuie să fii la max 100m (ești la ${distance.toFixed(0)}m)`
            });
            resolve(false);
          }
        },
        (error) => {
          console.error("GPS error:", error);
          toast.error("Nu am putut accesa locația ta!", {
            description: "Activează GPS-ul și permisiunile de locație"
          });
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentCenter) return;

    setUploadingPhoto(true);
    
    try {
      // Verifică dacă e imagine
      if (!file.type.startsWith('image/')) {
        toast.error("Te rog să încarci o imagine!");
        return;
      }

      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recycling-photos')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Continue anyway pentru demo
      }

      
      const hasRecyclables = true; // Simulare validare AI

      if (!hasRecyclables) {
        toast.error("Nu am detectat materiale de reciclat în poză!");
        return;
      }

      // Update points
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        await supabase
          .from('profiles')
          .update({ total_points: profile.total_points + 10 })
          .eq('id', user.id);
      }

      toast.success(`Check-in la ${currentCenter.center.name}!`, {
        description: "Punct deblocat cu succes! +10 puncte 🌱"
      });

      // Unlock the center (scratch effect)
      const newUnlocked = [...unlockedRegions, currentCenter.regionId];
      setUnlockedRegions(newUnlocked);
      
      // Save to localStorage pentru persistence
      localStorage.setItem(`eco_map_unlocked_${user.id}`, JSON.stringify(newUnlocked));
      
      // Dispatch custom event pentru a actualiza componenta EcoMapProgress
      window.dispatchEvent(new CustomEvent('eco-map-updated', { 
        detail: { count: newUnlocked.length } 
      }));
      
      setCurrentCenter(null);

    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error("Eroare la încărcarea pozei!");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCheckIn = async (center: any, regionId: number) => {
    // Prevent duplicate unlocks
    if (unlockedRegions.includes(regionId)) {
      toast.error("Punct deja vizitat!");
      return;
    }

    // Step 1: Verifică GPS
    const isNearby = await verifyLocation(center);
    if (!isNearby) return;

    // Step 2: Cere poză
    setCurrentCenter({ center, regionId });
    toast.info("Acum fă o poză la materialele de reciclat!", {
      description: "Click pe butonul 📷 pentru a încărca o poză"
    });
    fileInputRef.current?.click();
  };

  const calculateProgress = () => {
    const totalCenters = romaniaRegions.reduce((acc, region) => acc + region.recyclingCenters.length, 0);
    return totalCenters > 0 ? Math.round((unlockedRegions.length / totalCenters) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <TopNavBar user={user} />
        <div className="pt-24 px-6 flex items-center justify-center">
          <p className="text-muted-foreground">Se încarcă harta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <TopNavBar user={user} />
      
      {/* Hidden file input pentru poze */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoUpload}
        disabled={uploadingPhoto}
      />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <MapPin className="h-10 w-10 text-primary" />
              Harta Eco România
            </h1>
            <p className="text-muted-foreground text-lg">
              Descoperă România reciclând! Vizitează centre de reciclare pentru a debloca zone pe hartă.
            </p>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Progres Total</p>
                    <p className="text-3xl font-bold text-primary">{calculateProgress()}%</p>
                  </div>
                  <Trophy className="h-10 w-10 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Puncte Debloccate</p>
                    <p className="text-3xl font-bold text-green-600">
                      {unlockedRegions.length}/{romaniaRegions.reduce((acc, r) => acc + r.recyclingCenters.length, 0)}
                    </p>
                  </div>
                  <Unlock className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Puncte Rămase</p>
                    <p className="text-3xl font-bold text-gray-500">
                      {romaniaRegions.reduce((acc, r) => acc + r.recyclingCenters.length, 0) - unlockedRegions.length}
                    </p>
                  </div>
                  <Lock className="h-10 w-10 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Container - Leaflet cu puncte reale */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[600px] w-full relative">
                <MapContainer
                  center={[45.9432, 24.9668]}
                  zoom={7}
                  style={{ height: "100%", width: "100%" }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Render Recycling Centers ca markere individuale */}
                  {romaniaRegions.flatMap(region => 
                    region.recyclingCenters.map(center => {
                      const isVisited = unlockedRegions.includes(center.id);
                      
                      return (
                        <Marker 
                          key={center.id} 
                          position={[center.lat, center.lng]}
                          icon={L.icon({
                            iconUrl: isVisited 
                              ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzIyYzU1ZSIvPjxwYXRoIGQ9Ik0xNiA4TDEwIDE0TDggMTIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+'
                              : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzljYTNhZiIvPjxwYXRoIGQ9Ik0xMiA4VjEyTTEyIDEyVjE2TTEyIDEySDhNMTIgMTJIMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+',
                            iconSize: [32, 32],
                            iconAnchor: [16, 32],
                            popupAnchor: [0, -32],
                          })}
                        >
                          <Popup>
                            <div className="p-2 min-w-[200px]">
                              <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                                {center.name}
                                {isVisited && <span className="text-green-500">✓</span>}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-2">{region.name}</p>
                              
                              {isVisited ? (
                                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                                  <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                                    ✓ Punct vizitat!
                                  </p>
                                  <p className="text-xs text-green-600 dark:text-green-400">
                                    +10 puncte câștigate
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-xs mb-2 text-muted-foreground">
                                    Vizitează acest centru pentru a câștiga puncte!
                                  </p>
                                  <Button
                                    size="sm"
                                    onClick={() => handleCheckIn(center, center.id)}
                                    className="w-full bg-primary"
                                  >
                                    <Camera className="h-3 w-3 mr-1" />
                                    Check-in (+10 puncte)
                                  </Button>
                                </div>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })
                  )}
                </MapContainer>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Legendă</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm">Punct vizitat - Check-in realizat cu succes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                  <span className="text-sm">Punct nevizitat - Necesită check-in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="h-8 w-8 text-blue-600" />
                  <span className="text-sm">Check-in cu GPS + poză la materiale reciclabile</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <span className="text-sm">+10 puncte pentru fiecare punct de reciclare vizitat</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoMap;
