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
    roomId?: string;
    port?: number;
    name: string;
    icon: string;
    isOn: false;
    type: RgbLedAccessory | GateAccessory | OutletAccessory;
  }
  