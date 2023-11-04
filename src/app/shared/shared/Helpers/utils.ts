export default class Utils {
    static formatBytes(bytes : number, decimals = 2) { 
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  
        const i = Math.floor(Math.log(bytes) / Math.log(k))
  
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    static userHomePage(role : string | null){
        if(!role) return "account/login";

        var roleName = this.convertToRole(+role);

        switch(roleName){
            case "Admin": {
                return "dashboard"
            }
            case "Customer": {
                return "ticket"
            }
            default : {
                return "account/login";
            }
        }
    }

    static convertToRole(role : number) {
        if(!role) return "No Access";
        switch (role){
          case 1: {
            return "Customer";
          }
          case 2: {
            return "Admin";
          }
          default: {
            return "No Access";
          }
        }
      }
}