type GateAccessory = {
    open: () => void;
    close: () => void;
  }
  
  type OutletAccessory = {};
  
  type RgbLedAccessory = {
    color: string
    setRgbColor: (color: string) => void
  }
  
  type Accessory = {
    id: string | number[]
    roomId?: string | number[];
    port?: number;
    name: string;
    icon: string;
    isOn: boolean;
    type: RgbLedAccessory | GateAccessory | OutletAccessory;
  }
  