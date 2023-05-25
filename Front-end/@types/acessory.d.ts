  type GateAccessory = {
    open: () => void;
    close: () => void;
  }
  
  type OutletAccessory = {};
  
  type RgbLedAccessory = {
    color: string
    setRgbColor: (color: string) => void
  }

  type BulbAccessory = {
    intensity: number
    setIntensity: (intensity: number) => void
  }

  type SmartTvAccessory = {
    volume: number;
    channel: number;
    setChannel: (channel: number) => void;
    setVolume: (volume: number) => void;
    setMute: (mute: boolean) => void;
  }

  
  type Accessory = {
    id: string | number[]
    roomId?: string | number[];
    port?: number;
    name: string;
    icon: string;
    isOn: boolean;
    type: BulbAccessory | RgbLedAccessory | GateAccessory | OutletAccessory | SmartTvAccessory;
  }
  