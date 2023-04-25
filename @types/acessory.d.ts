type GateAccessory = {
    id: string;
    roomId?: string;
    port?: number;
    name: string;
    icon: string;
    state: 'open' | 'closed';
    type: 'gate';
  };
  
  type OutletAccessory = {
    id: string;
    roomId?: string;
    port?: number;
    name: string;
    icon: string;
    state: 'on' | 'off';
    type: 'outlet';
  };
  
  type RgbLedAccessory = {
    id: string;
    roomId?: string;
    port?: number;
    name: string;
    icon: string;
    state: 'on' | 'off';
    type: 'rgb-led';
    color: string; // código de cor hexadecimal
  };
  
  type Accessory = LightAccessory | FanAccessory | GateAccessory | OutletAccessory | RgbLedAccessory;
  