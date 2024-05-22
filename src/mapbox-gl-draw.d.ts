declare module '@mapbox/mapbox-gl-draw' {
    import { IControl } from 'mapbox-gl';
  
    export default class MapboxDraw implements IControl {
      constructor(options?: any);
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(map: mapboxgl.Map): void;
      getDefaultPosition(): string;
      getSelectedIds(): string[];
      getSelected(): any;
      getAll(): any;
      delete(ids: string | string[]): void;
      deleteAll(): void;
    }
  }
  