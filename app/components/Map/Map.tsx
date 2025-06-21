"use client";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  NavigationControl,
  ScaleControl,
  useControl,
} from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { DeckProps } from "@deck.gl/core";
import { cva, type VariantProps } from "class-variance-authority";

const MapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const mapVariants = cva(["fill"], {
  variants: {
    size: {
      small: "w-64 h-48",
      medium: "w-96 h-64",
      large: "w-full h-96",
      fill: "w-full h-full",
    },
  },
  defaultVariants: {
    size: "fill",
  },
});

interface MapVariants extends VariantProps<typeof mapVariants> {}

function MapComponent({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & MapVariants) {
  const layers = [];

  return (
    <div className={mapVariants({ className, size })} {...props}>
      <Map
        mapboxAccessToken={MapboxAccessToken}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />
        <FullscreenControl />
        <DeckGLOverlay layers={layers} />
      </Map>
    </div>
  );
}

export { MapComponent, MapVariants };
