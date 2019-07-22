const md5 = require('md5');
module.exports = {
    async hash(params, salt=Date.now(), times=3) {
        let hashedpass
        for(let i=0; i<=times; i++){
         hashedpass = await md5(`${params}$${salt}$${times}`)
        };
        hashedpass= `$${salt}$${times}$${hashedpass}`;
        return hashedpass
    },

    async compare(password, dataPassword) {
        const check = dataPassword.split('$')
        const [item,salt,times,passw] = check
        const result = await this.hash(password,salt,times)
        if(result === dataPassword) return true
        else return false
    }
}