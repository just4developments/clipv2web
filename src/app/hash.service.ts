const MAX_SIZE = 6;

declare var window: any;

export class HashService {

  static fromHex(hex: any){
    return window.decodeURIComponent(hex.replace(/(..)/g,'%$1'));
  }
  static toHex(str:any){
    let hex = window.unescape(encodeURIComponent(str))
    .split('').map(function(v){
      return v.charCodeAt(0).toString(16);
    }).join('');
    return hex;
  }

  public static decrypt(res: any) {
    if('encryption/json' !== res.headers.get('content-type')){
      return res.json();
    }
    let sf:any = res._body;
    sf = sf.replace(/\0/g, '=');
    sf = sf.split('');
    for (var i = 0; i < sf.length - 1; i += 2) {
      if(i >= MAX_SIZE) break;
      if (i + 1 < sf.length && sf[i] != '=' && sf[i + 1] != '=') {
        var tmp = sf[i];
        sf[i] = sf[i + 1];
        sf[i + 1] = tmp;
      }
    }
    sf = sf.join('');
    return JSON.parse(HashService.fromHex(sf));
  }

  // public static encrypt(res: any) {
  //   if(data === null || data === undefined) return data;
  //   data = JSON.stringify(data);
  //   let sf:any = HashService.toHex(data);
  //   sf = sf.split('');
  //   for (let i = 0; i < sf.length - 1; i += 2) {
  //     if(i >= MAX_SIZE) break;
  //     if (i + 1 < sf.length && sf[i] != '=' && sf[i + 1] != '=') {
  //       let tmp = sf[i];
  //       sf[i] = sf[i + 1];
  //       sf[i + 1] = tmp;
  //     }
  //   }
  //   sf = sf.join('').replace(/=/g, '\0');
  //   return sf;
  // }

}