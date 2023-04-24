type Accessory = {
    id: string;
    roomId?: string;
    port?: number;
    name: string;
    icon: string;
    state: 'on' | 'off';
    type: 'light' | 'fan';
}